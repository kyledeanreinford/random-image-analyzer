import OpenAI from "openai";

type NasaResponse = {
	copyright: string,
	date: string,
	explanation: string,
	hdurl: string,
	media_type: string,
	service_version: string,
	title: string,
	url: string,
}

type PhotoDetails = {
	title: string,
	url: string,
	date: Date,
	copyright: string
}

const savePhotoDetails = async (store: KVNamespace, photoDetails: PhotoDetails): Promise<void> => {
	const keyString = photoDetails.title + "" + photoDetails.date.toString() + "" + "" + photoDetails.copyright
	const existing = await store.get(keyString)
	if(existing) {
		console.error("this item already exists in the archive")
		return
	} else {
		await store.put(keyString, photoDetails.url)
		console.log("successfully added to archive")
	}
}

export default {
	async fetch(_: Request, env: Env): Promise<Response> {
		let latestMaybe: string = ""
		const list = await env.PHOTO_DETAILS.list()
		list.keys.map(key => {
			latestMaybe = key.name
		});

		const url = await env.PHOTO_DETAILS.get(latestMaybe)

		const html = `<!DOCTYPE html>
    <body>
      <h1>Latest Image</h1>
      <img src="${url}" alt={'possible latest image'}>
    </body>`;

		return new Response(html, {
			headers: {
				"content-type": "text/html;charset=UTF-8",
			},
		});
	},

	async scheduled(event: ScheduledController, env: Env, _: ExecutionContext): Promise<void> {
		let result = await fetch(`https://api.nasa.gov/planetary/apod?count=1&api_key=${env.NASA_API_KEY}`);
		if(!result.ok) {
			console.log("failed to fetch data")
		}

		const json = await result.json() as NasaResponse[]
		if(json[0].media_type !== "image") return

		const url: string = json[0].url
		const copyright: string = json[0].copyright
		const date: string = json[0].date
		const title: string = json[0].title

		const openAi = new OpenAI({ apiKey: env.OPEN_API_KEY });
		const openAiResponse = await openAi.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "user",
					content: [
						{ type: "text", text: "output this photo's characteristics and keywords in a brief, comma separated list" },
						{
							type: "image_url",
							image_url: {
								"url": url,
							},
						},
					],
				},
			],
		});

		if(!openAiResponse.choices[0].message.content) {
			console.log("no openAiResponse")
			return
		}

		await savePhotoDetails(env.PHOTO_DETAILS, { title, url, date: new Date(date), copyright })

		const characteristics = openAiResponse.choices[0].message.content!.trim().split(",")

		characteristics.forEach((characteristic) => {
			console.log(characteristic)
		})

		console.log(`trigger fired at ${event.cron}`);
	},
} satisfies ExportedHandler<Env>;
