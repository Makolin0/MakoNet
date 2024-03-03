const MAX_RNG = 1000;

export default function generateLoot() {
	const result = Math.floor(Math.random() * MAX_RNG);
	switch (true) {
		//OP (5)
		case result <= 5:
			return "OP";
		//jajko smoka (20)
		case result <= 25:
			return "Jajo smoka";
		//bedrock (30)
		case result <= 55:
			return "bedrock";
		//2 netherite (50)
		case result <= 105:
			return "2x netherite";
		//knockback 10 patyk (50)
		case result <= 155:
			return "knockback 10 patyk";
		//netherite upgrade (65)
		case result <= 220:
			return "netherite upgrade";
		//glowa smoka (70)
		case result <= 290:
			return "Glowa smoka";
		//shulker (70)
		case result <= 360:
			return "shulker";
		//armor trim (70)
		case result <= 430:
			return "armor trim";
		//music disk (70)
		case result <= 500:
			return "music disk";
		//enchant (100)
		case result <= 600:
			return "enchant";
		//zelazo (100)
		case result <= 700:
			return "zelazo";
		//diament (100)
		case result <= 800:
			return "diament";
		//emerlad (100)
		case result <= 900:
			return "emerald";
		//wegiel blok (100)
		case result <= 1000:
			return "blok wegla";

		default:
			break;
	}
	return result;
}
