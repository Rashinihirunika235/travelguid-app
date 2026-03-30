export interface Place {
  name: string;
  description: string;
  imageUrl: any;
  latitude: number; 
  longitude: number; 
}

export interface Hotel {
  name: string;
  type: 'luxury' | 'budget';
  description: string;
  priceRange: string;
}

export interface District {
  id: string;
  name: string;
  nameSinhala: string;
  nameTamil: string;
  province: string;
  description: string;
  topPlaces: Place[];
  hotels: Hotel[];
  historicalSignificance: string;
  mustTryFood: string[];
  travelRoute: string;
  imageUrl: any;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const districts: District[] = [
  {
    id: "colombo",
    name: "Colombo",
    
    nameSinhala: "කොළඹ",
    nameTamil: "கொழும்பு",
    province: "Western",
    description: "The vibrant capital city of Sri Lanka, blending colonial charm with modern urban life.",
    topPlaces: [
      { name: "Galle Face Green", 
        description: "Urban park along the ocean with stunning sunsets", 
        latitude: 6.9275, 
        longitude: 79.8437,
        imageUrl: "https://images.unsplash.com/photo-1707560664096-790e8976e2c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FsbGVmYWNlfGVufDB8fDB8fHww" 
       
      },
      { name: "Gangaramaya Temple", 
        description: "Eclectic Buddhist temple with diverse architecture", 
        latitude: 6.9147, 
        longitude: 79.8577,
        imageUrl: "https://images.unsplash.com/photo-1653478673261-4937126eb512?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FuZ2FyYW1heWElMjB0ZW1wbGV8ZW58MHx8MHx8fDA%3D" 
      },
      { name: "Viharamahadevi Park",
        latitude: 6.9128, 
        longitude: 79.8612, 
        description: "Largest park in Colombo with beautiful landscapes", 
        imageUrl: "https://media.istockphoto.com/id/1279336512/photo/palm-tree-alley-in-royal-botanic-king-gardens-kandy-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=UYLOddBaRKYfzudMVncpaZTmduhoIISWPjSCDAvQMio=" }
    ],
    hotels: [
      { name: "Shangri-La Colombo", type: "luxury", description: "5-star waterfront hotel with ocean views", priceRange: "$200-400" },
      { name: "CityRest Fort", type: "budget", description: "Clean hostel in the heart of the city", priceRange: "$15-30" }
    ],
    historicalSignificance: "Colombo has been a strategic trading port for over 2,000 years, influenced by Portuguese, Dutch, and British colonial powers. It became the capital under British rule in 1815.",
    mustTryFood: ["Kottu Roti", "Hoppers", "String Hoppers with Curry", "Seafood at Galle Face"],
    travelRoute: "From Bandaranaike International Airport (35km north), take the expressway (30 mins) or train from Katunayake to Colombo Fort Station (1 hour).",
    imageUrl: "https://images.unsplash.com/photo-1653151106233-8e928c21bc1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sb21ib3xlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { latitude: 6.9271, longitude: 79.8612 }
  },
  {
    id: "galle",
    name: "Galle",
    nameSinhala: "ගාල්ල",
    nameTamil: "காலி",
    province: "Southern",
    description: "A UNESCO World Heritage site famous for its 17th-century Dutch colonial fort.",
    topPlaces: [
      { 
        name: "Galle Fort",
        latitude: 6.0271, 
        longitude: 80.2170, 
        description: "UNESCO heritage site with Dutch colonial architecture", 
        imageUrl: "https://images.unsplash.com/photo-1654561773591-57b9413c45c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FsbGUlMjBmb3J0fGVufDB8fDB8fHww" },
      { name: "Jungle Beach",
        latitude: 6.0305, 
        longitude: 80.2435, 
        description: "Secluded beach with clear waters and coral reefs", 
        imageUrl: "https://media.istockphoto.com/id/2164074477/photo/aerial-view-of-idyllic-beach-on-sri-lanka-at-golden-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=UkOKzRJOmzOCk6HaBoqnQxG1I0l7GivC3lB4PcTCKL8=" },
      { name: "Koggala Lake",
        latitude: 5.9928, 
        longitude: 80.3421, 
        description: "Serene lake with mangroves and wildlife", 
        imageUrl: "https://images.unsplash.com/photo-1582608639393-0b228d7f473b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a29nZ2FsYSUyMGxha2V8ZW58MHx8MHx8fDA%3D" }
    ],
    hotels: [
      { name: "Amangalla", type: "luxury", description: "Historic luxury hotel inside the Fort", priceRange: "$400-800" },
      { name: "Fort Inn Guest House", type: "budget", description: "Charming guesthouse within the Fort walls", priceRange: "$25-50" }
    ],
    historicalSignificance: "Galle was the main port of Sri Lanka for over 200 years under Dutch rule. The Fort, built in 1663, is the largest remaining European-built fortress in Asia.",
    mustTryFood: ["Galle Fort Curries", "Egg Hoppers", "Seafood Platter", "Coconut Sambol"],
    travelRoute: "From Colombo: Take the Southern Expressway (1.5 hours by car) or scenic coastal train (2.5 hours) to Galle Station.",
    imageUrl: "https://images.unsplash.com/flagged/photo-1567498975675-a3adf1574cb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FsbGV8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 6.0329, longitude: 80.2168 }
  },
  {
    id: "kandy",
    name: "Kandy",
    nameSinhala: "මහනුවර",
    nameTamil: "கண்டி",
    province: "Central",
    description: "The hill capital and spiritual heart of Sri Lanka, home to the Sacred Tooth Relic.",
    topPlaces: [
      { name: "Temple of the Sacred Tooth Relic",
        latitude: 7.2936, 
        longitude: 80.6413, 
        description: "Buddhism's most sacred temple", 
        imageUrl: "https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVtcGxlJTIwb2YlMjB0b290aHxlbnwwfHwwfHx8MA%3D%3D" },
      { name: "Kandy Lake",
        latitude: 7.2911, 
        longitude: 80.6402, 
        description: "Artificial lake built in 1807 with scenic walks", 
        imageUrl: "https://images.unsplash.com/photo-1675597849896-b5fc7a3d5fb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FuZHklMjBsYWtlfGVufDB8fDB8fHww" },
      { name: "Peradeniya Botanical Gardens", 
        latitude: 7.2681, 
        longitude: 80.5966,
        description: "147-acre garden with 4,000+ plant species", 
        imageUrl: "https://media.istockphoto.com/id/171583913/photo/park.webp?a=1&b=1&s=612x612&w=0&k=20&c=2cRxXJ7QIo5A2kbCEBYg_VRa6PSYI4_glLOjTNjabA0=" }
    ],
    hotels: [
      { name: "The Kandy House", type: "luxury", description: "Boutique heritage hotel in colonial mansion", priceRange: "$250-500" },
      { name: "Kandy City Hostel", type: "budget", description: "Social hostel near the lake", priceRange: "$12-25" }
    ],
    historicalSignificance: "Kandy was the last capital of the Sinhalese kings and resisted European colonization for centuries. It remained an independent kingdom until 1815.",
    mustTryFood: ["Kandyan Curries", "Milk Rice (Kiribath)", "Watalappan", "Jackfruit Curry"],
    travelRoute: "From Colombo: Take the A1 highway (3 hours) or scenic train through the hills (2.5-3 hours) to Kandy Station.",
    imageUrl: "https://images.unsplash.com/photo-1642095012223-65ee6d570974?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGthbmR5fGVufDB8fDB8fHww",
    coordinates: { latitude: 7.2906, longitude: 80.6337 }
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    nameSinhala: "නුවරඑළිය",
    nameTamil: "நுவரெலியா",
    province: "Central",
    description: "Little England of Sri Lanka, known for tea plantations and cool climate.",
    topPlaces: [
      { name: "Horton Plains National Park",
        latitude: 6.8016, 
        longitude: 80.8142, 
        description: "Cloud forest with World's End cliff viewpoint", 
        imageUrl: "https://images.unsplash.com/photo-1610017810004-a6f3c531df34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SG9ydG9uJTIwUGxhaW5zJTIwTmF0aW9uYWwlMjBQYXJrfGVufDB8fDB8fHww" },
      { name: "Gregory Lake", 
        latitude: 6.9625, 
        longitude: 80.7781,
        description: "Scenic lake surrounded by hills and tea estates", 
        imageUrl: "https://c7.alamy.com/comp/2PHT4TT/lake-gregory-at-nuwara-eliya-sri-lanka-2PHT4TT.jpg" },
      { name: "Pedro Tea Estate", 
        latitude: 6.9686, 
        longitude: 80.8033,
        description: "Working tea factory with tours and tastings", 
        imageUrl: "https://images.unsplash.com/photo-1760884966322-207bd5afdd77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UGVkcm8lMjBUZWElMjBFc3RhdGV8ZW58MHx8MHx8fDA%3D" }
    ],
    hotels: [
      { name: "The Hill Club", type: "luxury", description: "Colonial-era club with old-world charm", priceRange: "$150-300" },
      { name: "Heaven Seven Hotel", type: "budget", description: "Modern hotel with lake views", priceRange: "$40-80" }
    ],
    historicalSignificance: "Established by British colonialists in the 19th century as a hill station retreat, Nuwara Eliya retains much of its colonial architecture and cool climate.",
    mustTryFood: ["Afternoon Tea with Scones", "Fresh Strawberry Desserts", "Warm Hoppers", "Vegetable Hot Pot"],
    travelRoute: "From Kandy: Take the A5 highway through Ramboda Pass (2.5 hours). Scenic train also available via Nanu Oya station.",
    imageUrl: "https://images.unsplash.com/photo-1706769731521-578e98e221bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bnV3YXJhZWxpeWF8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 6.9497, longitude: 80.7891 }
  },
  {
    id: "sigiriya",
    name: "Sigiriya",
    nameSinhala: "සීගිරිය",
    nameTamil: "சிகிரியா",
    province: "Central",
    description: "Ancient rock fortress and palace ruins, a UNESCO World Heritage masterpiece.",
    topPlaces: [
      { name: "Sigiriya Rock Fortress", 
        latitude: 7.9570, 
        longitude: 80.7603,
        description: "Ancient palace ruins atop 200m rock", 
        imageUrl: "https://images.unsplash.com/photo-1594822779091-7726437c5ac1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNpZ2lyaXlhJTIwcm9ja3xlbnwwfHwwfHx8MA%3D%3D" },
      { name: "Pidurangala Rock", 
        latitude: 7.9650, 
        longitude: 80.7650,
        description: "Best viewpoint for Sigiriya at sunrise", 
        imageUrl: "https://images.unsplash.com/photo-1663784025074-49e9e7f11f62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBpZHVyYW5nYWxhfGVufDB8fDB8fHww" },
      { name: "Minneriya National Park", 
        latitude: 8.0245,
        longitude: 80.8211, 
        description: "Famous for the elephant gathering",
        imageUrl: "https://media.istockphoto.com/id/118349766/photo/wild-elephants.webp?a=1&b=1&s=612x612&w=0&k=20&c=jU_t3VzzzEvMLPxvPUsmvrXdiPTF2TKDc48ZHUwDe9k=" }
    ],
    hotels: [
      { name: "Water Garden Sigiriya", type: "luxury", description: "Luxury villas with views of the rock", priceRange: "$300-600" },
      { name: "Sigiriya Hostel", type: "budget", description: "Backpacker hostel with sunset views", priceRange: "$10-20" }
    ],
    historicalSignificance: "Built by King Kashyapa in the 5th century AD, this ancient capital features sophisticated hydraulic engineering, frescoes, and mirror walls.",
    mustTryFood: ["Village Style Rice & Curry", "Fresh Fruits", "Buffalo Curd with Treacle", "Local Arrack Cocktails"],
    travelRoute: "From Colombo: Take the A6 highway via Kurunegala and Dambulla (4 hours). From Kandy, it's 2.5 hours via Matale.",
    imageUrl: "https://images.unsplash.com/photo-1612862862126-865765df2ded?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2lnaXJpeWF8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 7.9570, longitude: 80.7603 }
  },
  {
    id: "anuradhapura",
    name: "Anuradhapura",
    nameSinhala: "අනුරාධපුර",
    nameTamil: "அனுராதபுரம்",
    province: "North Central",
    description: "The first ancient capital of Sri Lanka, sacred city with massive dagobas.",
    topPlaces: [
      { name: "Ruwanwelisaya Stupa",
        latitude: 8.3501, 
        longitude: 80.3963, 
        description: "Massive white stupa built in 140 BC", 
        imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Sri Maha Bodhi",
        latitude: 8.3448, 
        longitude: 80.3971, 
        description: "Oldest documented tree in the world (2,300 years)", 
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" },
      { name: "Jetavanaramaya",
        latitude: 8.3521, 
        longitude: 80.4032, 
        description: "Tallest stupa in the ancient world", 
        imageUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400" }
    ],
    hotels: [
      { name: "Ulagalla Resort", type: "luxury", description: "Eco-luxury resort with private pools", priceRange: "$300-500" },
      { name: "Milano Tourist Rest", type: "budget", description: "Family-run guesthouse near ruins", priceRange: "$15-30" }
    ],
    historicalSignificance: "Founded in the 4th century BC, Anuradhapura was the political and religious capital for 1,300 years. It showcases the earliest Sinhalese Buddhist civilization.",
    mustTryFood: ["Pittu with Coconut", "Traditional Jaggery", "Rice and Eight Curries", "Fresh Toddy"],
    travelRoute: "From Colombo: Take the A6 Puttalam Road (5 hours) or train to Anuradhapura station (5-6 hours). From Sigiriya: 1.5 hours via Habarana.",
    imageUrl: "https://media.istockphoto.com/id/1212171201/photo/mihintale-temple-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=FvN_Dtv2vaMp5TuMGL8IV8pij7-1lktR9NGicjBzflA=",
    coordinates: { latitude: 8.3114, longitude: 80.4037 }
  },
  {
    id: "polonnaruwa",
    name: "Polonnaruwa",
    nameSinhala: "පොළොන්නරුව",
    nameTamil: "பொலன்னறுவை",
    province: "North Central",
    description: "The second ancient capital with well-preserved ruins and the Gal Viharaya.",
    topPlaces: [
      { name: "Gal Viharaya",
        latitude: 7.9658, 
        longitude: 81.0048, 
        description: "Rock temple with stunning Buddha statues", 
        imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Parakrama Samudra",
        latitude: 7.9250, 
        longitude: 80.9833, 
        description: "Massive ancient reservoir and lake", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Royal Palace Complex",
        latitude: 7.9404, 
        longitude: 80.9995, 
        description: "Ruins of the ancient royal court", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" }
    ],
    hotels: [
      { name: "The Lake Hotel", type: "luxury", description: "Boutique hotel overlooking Parakrama Samudra", priceRange: "$180-350" },
      { name: "Sudu Araliya Hotel", type: "budget", description: "Comfortable hotel near the lake", priceRange: "$40-80" }
    ],
    historicalSignificance: "The second capital of Sri Lanka (11th-13th centuries), Polonnaruwa represents the island's golden age of irrigation, architecture, and art under Parakramabahu I.",
    mustTryFood: ["Traditional Rice and Curry", "Kokis (New Year sweet)", "Milk Toffee", "Wood Apple Juice"],
    travelRoute: "From Colombo: Take the A6 highway (5 hours). From Sigiriya: 1.5 hours. Combine with Anuradhapura for a cultural triangle tour.",
    imageUrl: "https://images.unsplash.com/photo-1709729508706-87741ec2d50a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9sb25uYXJ1d2F8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 7.9403, longitude: 81.0188 }
  },
  {
    id: "trincomalee",
    name: "Trincomalee",
    nameSinhala: "ත්‍රිකුණාමලය",
    nameTamil: "திருகோணமலை",
    province: "Eastern",
    description: "Natural deep-water harbor with pristine beaches and Hindu temples.",
    topPlaces: [
      { name: "Nilaveli Beach",
        latitude: 8.6872, 
        longitude: 81.1877, 
        description: "Pristine beach with crystal clear waters", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Koneswaram Temple",
        latitude: 8.5878, 
        longitude: 81.2443, 
        description: "Ancient Hindu temple on Swami Rock",
         imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Pigeon Island",
        latitude: 8.7188, 
        longitude: 81.2017,
        description: "National park with coral reefs for snorkeling", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" }
    ],
    hotels: [
      { name: "Anantamaa Hotel", type: "luxury", description: "Beachfront luxury with spa", priceRange: "$200-400" },
      { name: "Nilaveli Beach Hotel", type: "budget", description: "Direct beach access, great value", priceRange: "$30-60" }
    ],
    historicalSignificance: "One of the oldest cities in Asia, Trincomalee's natural harbor attracted traders from Greece, Rome, and China. It has been significant in maritime history for 2,500 years.",
    mustTryFood: ["Fresh Seafood Grill", "Crab Curry", "Kottu Roti (Eastern Style)", "Lamprais"],
    travelRoute: "From Colombo: Take the A6 highway (6 hours). Domestic flights also available to China Bay Airport (45 mins). From Sigiriya: 2 hours via Habarana.",
    imageUrl: "https://images.unsplash.com/photo-1693112118583-7006a44ea44e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJpbmNvbWFsZWV8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 8.5874, longitude: 81.2152 }
  },
  {
    id: "jaffna",
    name: "Jaffna",
    nameSinhala: "යාපනය",
    nameTamil: "யாழ்ப்பாணம்",
    province: "Northern",
    description: "Cultural capital of Tamil Sri Lanka with unique cuisine and historic sites.",
    topPlaces: [
      { name: "Nallur Kandaswamy Temple", 
        latitude: 9.6745, 
        longitude: 80.0301,
        description: "Magnificent Hindu temple with golden gopuram", 
        imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Jaffna Fort",
        latitude: 9.6617, 
        longitude: 80.0072, 
        description: "Dutch colonial fort, second largest in Sri Lanka", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" },
      { name: "Delft Island", 
        latitude: 9.5167, 
        longitude: 79.6833,
        description: "Remote island with wild horses and coral walls", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" }
    ],
    hotels: [
      { name: "Jetwing Jaffna", type: "luxury", description: "Modern luxury hotel in city center", priceRange: "$150-280" },
      { name: "Green Grass Hotel", type: "budget", description: "Clean hotel with traditional hospitality", priceRange: "$25-50" }
    ],
    historicalSignificance: "Jaffna was the capital of a Tamil kingdom from the 13th-17th centuries. The region has a distinct culture, language, and traditions separate from the rest of Sri Lanka.",
    mustTryFood: ["Jaffna Crab Curry", "Odiyal Kool (Seafood Soup)", "Palmyrah Toffee", "Mango Curry"],
    travelRoute: "From Colombo: Take the A9 highway (8-9 hours) or fly to Jaffna Airport (1 hour). Train service also available (6-8 hours).",
    imageUrl: "https://images.unsplash.com/photo-1725680968792-c8dce6d6cf18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFmZm5hfGVufDB8fDB8fHww",
    coordinates: { latitude: 9.6615, longitude: 80.0255 }
  },
  {
    id: "batticaloa",
    name: "Batticaloa",
    nameSinhala: "මඩකලපුව",
    nameTamil: "மட்டக்களப்பு",
    province: "Eastern",
    description: "Lagoon city known for singing fish and unspoiled beaches.",
    topPlaces: [
      { name: "Batticaloa Lagoon",
        latitude: 7.7170, 
        longitude: 81.6920, 
        description: "Large estuarine lagoon perfect for boating", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Kalkudah Beach", 
        latitude: 7.9230, 
        longitude: 81.5640,
        description: "Crescent-shaped pristine beach", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" },
      { name: "Dutch Fort",
        latitude: 7.7210, 
        longitude: 81.6990, 
        description: "Small colonial fort by the lagoon", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" }
    ],
    hotels: [
      { name: "Uga Bay Resort", type: "luxury", description: "Beachfront villas on Pasikudah Beach", priceRange: "$250-500" },
      { name: "Palm Beach Hotel", type: "budget", description: "Simple hotel near the beach", priceRange: "$20-40" }
    ],
    historicalSignificance: "Batticaloa was a strategic trading post for the Portuguese and Dutch. Its name comes from 'Matted-sails' referring to the local fishing boats.",
    mustTryFood: ["Batticaloa Crab Curry", "Seafood Kottu", "Rice and Fish Curry", "Coconut Toddy"],
    travelRoute: "From Colombo: Take the A4 highway (7 hours). From Trincomalee: 3 hours via Chenkalady. Also accessible by train.",
    imageUrl: "https://images.unsplash.com/photo-1673969615018-92dc73c756f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmF0dGljYWxvYXxlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { latitude: 7.7300, longitude: 81.7000 }
  },
  {
    id: "matara",
    name: "Matara",
    nameSinhala: "මාතර",
    nameTamil: "மாத்தறை",
    province: "Southern",
    description: "Coastal district with Dutch forts and some of Sri Lanka's best surfing beaches.",
    topPlaces: [
      { name: "Weligama Bay", 
        latitude: 5.9730, 
        longitude: 80.4280,
        description: "Famous for stilt fishermen and beginner surfing", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Mirissa Beach",
        latitude: 5.9483, 
        longitude: 80.4716, 
        description: "Stunning beach for whale watching", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" },
      { name: "Dondra Head Lighthouse",
        latitude: 5.9224, 
        longitude: 80.5910, 
        description: "Sri Lanka's tallest lighthouse at southern tip", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" }
    ],
    hotels: [
      { name: "Cape Weligama", type: "luxury", description: "Clifftop resort with infinity pools", priceRange: "$400-800" },
      { name: "Hangtime Hostel", type: "budget", description: "Surf hostel popular with backpackers", priceRange: "$15-30" }
    ],
    historicalSignificance: "Matara was an important Dutch trading center. The Star Fort and Matara Fort remain as reminders of colonial rule along this strategic coastline.",
    mustTryFood: ["Weligama Fish Curry", "Coconut Roti", "Pol Sambol", "Fresh Seafood BBQ"],
    travelRoute: "From Galle: 30 minutes by train or bus along the coast. From Colombo: Take the Southern Expressway (2 hours) or coastal train (3 hours).",
    imageUrl: "https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg",
    coordinates: { latitude: 5.9549, longitude: 80.5550 }
  },
  {
    id: "hambantota",
    name: "Hambantota",
    nameSinhala: "හම්බන්තොට",
    nameTamil: "அம்பாந்தோட்டை",
    province: "Southern",
    description: "Emerging tourism hub with national parks and bird sanctuaries.",
    topPlaces: [
      { name: "Yala National Park", 
        latitude: 6.3681, 
        longitude: 81.5230,
        description: "Famous for leopard sightings and wildlife", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" },
      { name: "Bundala National Park", 
        latitude: 6.1754, 
        longitude: 81.2185,
        description: "UNESCO biosphere reserve for birdwatching", 
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" },
      { name: "Kalametiya Sanctuary",
        latitude: 6.0910, 
        longitude: 80.9470, 
        description: "Wetland sanctuary with diverse birdlife", 
        imageUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400" }
    ],
    hotels: [
      { name: "Cinnamon Wild Yala", type: "luxury", description: "Safari lodge on the edge of Yala", priceRange: "$300-600" },
      { name: "Tithira Guest House", type: "budget", description: "Family guesthouse near Tissamaharama", priceRange: "$20-40" }
    ],
    historicalSignificance: "Hambantota has ancient trading roots and was a key port in the maritime Silk Road. The area has seen rapid development with a new port and airport.",
    mustTryFood: ["Wild Game Curry", "Seafood Platter", "Tissa Wewa Fish", "Local Rice Varieties"],
    travelRoute: "From Colombo: Take the Southern Expressway to Hambantota (2.5 hours). Mattala Airport also offers flights from Colombo (30 mins).",
    imageUrl: "https://images.pexels.com/photos/321526/pexels-photo-321526.jpeg",
    coordinates: { latitude: 6.1246, longitude: 81.1186 }
  },
  {
    id: "kalutara",
    name: "Kalutara",
    nameSinhala: "කළුතර",
    nameTamil: "களுத்துறை",
    province: "Western",
    description: "Coastal district south of Colombo with temples and beach resorts.",
    topPlaces: [
      { name: "Kalutara Bodhiya", 
        latitude: 6.5861, longitude: 79.9601,
        description: "Giant white stupa on the beach road", 
        imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Bentota Beach", 
        latitude: 6.4227, longitude: 79.9987,
        description: "Golden sandy beach with water sports", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Brief Garden", 
        latitude: 6.4461, longitude: 80.0336,
        description: "Landscape garden created by Bevis Bawa", 
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" }
    ],
    hotels: [
      { name: "Cinnamon Bentota Beach", type: "luxury", description: "Iconic beach resort by Geoffrey Bawa", priceRange: "$250-500" },
      { name: "Horizon Kite Center", type: "budget", description: "Kitesurfing hostel in Kalpitiya area", priceRange: "$25-50" }
    ],
    historicalSignificance: "Kalutara was an important spice trading center. The Kalutara Bodhiya marks the place where the sacred Bodhi tree first arrived in Sri Lanka.",
    mustTryFood: ["Kalutara Fish Curry", "Rambutan (seasonal)", "Mangosteen", "Fresh Toddy"],
    travelRoute: "From Colombo: Just 45 minutes south via the Galle Road (A2) or Southern Expressway. Regular trains also available.",
    imageUrl: "https://images.unsplash.com/photo-1697548532456-561b5f9a694d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FsdXRoYXJhfGVufDB8fDB8fHww",
    coordinates: { latitude: 6.5854, longitude: 79.9607 }
  },
  {
    id: "gampaha",
    name: "Gampaha",
    nameSinhala: "ගම්පහ",
    nameTamil: "கம்பஹா",
    province: "Western",
    description: "Suburban district surrounding Colombo with beaches and wetlands.",
    topPlaces: [
      { name: "Negombo Beach", 
        latitude: 7.2091, 
        longitude: 79.8351,
        description: "Wide sandy beach close to the airport",
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Muthurajawela Marsh", 
        latitude: 7.0450, 
        longitude: 79.9140,
        description: "Wetland sanctuary for bird watching", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" },
      { name: "Dutch Canal",
        latitude: 7.2110, 
        longitude: 79.8400, 
        description: "Historic waterway for boat rides", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" }
    ],
    hotels: [
      { name: "Jetwing Lagoon", type: "luxury", description: "Geoffrey Bawa-designed lagoon resort", priceRange: "$200-400" },
      { name: "Sevonrich Holiday Resort", type: "budget", description: "Beachfront budget accommodation", priceRange: "$20-40" }
    ],
    historicalSignificance: "Gampaha has been settled since ancient times, with the Kelaniya Temple dating back to the 3rd century BC. The Dutch left their mark with canals.",
    mustTryFood: ["Negombo Crab Curry", "Lamprais", "Dutch Burgher Dishes", "Fresh Lagoon Fish"],
    travelRoute: "From Colombo: 30 minutes north via the Colombo-Katunayake Expressway. From the airport: Just 20 minutes to Negombo.",
    imageUrl: "https://media.istockphoto.com/id/155283084/photo/old-port-of-negombo-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=tNnbnairEjGCfxmNq8mPzYnzTneMBwBM0UpWQuGqFiA=",
    coordinates: { latitude: 7.0840, longitude: 80.0098 }
  },
  {
    id: "ratnapura",
    name: "Ratnapura",
    nameSinhala: "රත්නපුර",
    nameTamil: "இரத்தினபுரி",
    province: "Sabaragamuwa",
    description: "The City of Gems, famous for sapphire and ruby mining.",
    topPlaces: [
      { name: "Sinharaja Forest Reserve",
        latitude: 6.3992, 
        longitude: 80.5050, 
        description: "UNESCO rainforest with unique biodiversity", 
        imageUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400" },
      { name: "Bopath Ella Falls", 
        latitude: 6.7865, 
        longitude: 80.3700,
        description: "Beautiful waterfall shaped like a Bo leaf", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Gem Mines", 
        latitude: 6.6828, 
        longitude: 80.3992,
        description: "Visit working sapphire and ruby mines", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" }
    ],
    hotels: [
      { name: "Gem Land Hotel", type: "luxury", description: "Boutique hotel with gem museum", priceRange: "$100-200" },
      { name: "Palm Garden Guest House", type: "budget", description: "Family-run guesthouse near waterfalls", priceRange: "$15-30" }
    ],
    historicalSignificance: "Ratnapura has been the center of Sri Lanka's gem trade for over 2,000 years. Ancient Greek and Roman texts mention Ratnapura gems.",
    mustTryFood: ["Ratnapura Red Rice", "Fresh Water Fish Curry", "Jackfruit Dishes", "Tropical Fruits"],
    travelRoute: "From Colombo: Take the A4 highway through Avissawella (2 hours). From Kandy: 2.5 hours via Gelioya.",
    imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUXFxcXFxcXFxcXFxcXFRUXFxcXFxgYHSggGBolGxgXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALoBDwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAQIEBQYHAAj/xABCEAACAQIEBAQCBwYEBAcAAAABAgMAEQQSITEFBkFREyJhcYGRByMyobHR8BRCUmLB4TNygvEVJJLCFjRDU4Oisv/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EAC0RAAICAgIBAwMBCQEAAAAAAAABAhEDIRIxBBNBYSJRcbEUMoGRocHR4fAF/9oADAMBAAIRAxEAPwDjZNNJokiWoRqaFBvJQ1kIr0gpgqg1EuDFEbGpP7SahRxUa1I0gND5JydKmcLhB1qGkFWGDunTSklKlSFLJcECDcVXPZTRsRxSwIFU8+JoxTZlZKfFa1GZrmoZlNLE+tOo0NRa4Mir7BYgAGstHJajw4og6VHJjsU1UEuZherqCEDasjgsSTvVk2OIXQkVzTgBlnjMcEa2/ekl4sCLDtWVnx1ydaYuPNq3omHcWa5vVSKkTz5iTQVFdeNUh4iGm2qQiaU51tRc0ZyIwa1Ewwu2tR5WtTIJ7Gmoxq4gLVX47FEG1ATiFhUGaYsbmpRx72KkSosSSdTVxh2uL1mUarDD4uwoTh9jNF7FADr1oeJcgE3qHFxLS1BxOOuLVNQdgobBjLGpX7cLVRM9IXNX9NMag881yfWmq9qiPIaVJO9U4hLHEDpUJqs8StQnjqcGBEKQ0sW9PlWgg1YYlIaIrC9RkevM1qWgFph3FFllFtKq45KV5aT092Ch0z1CJpzyXplVQUeo8aUCjo4oMIYCnowoGalvQaATExFutJJizbeoMj2pni0OCBQcuaTxKHnpAtFRGoOpp16GDXiaBiVBNalmmvUMNTi1Lw3YKATGh0+U0yqhJKCvMlJE9ELUrACRbUa9MFKTQbANLUMy05xQcpplQUF8X0r2eg0oFEJ40lG8LSmGM1jFxK1RXkok9Rr1GC0IhHqOyWo5NeAqqGsjxrej0uWkJrBGyUGnO9MomPGvV6lFYx4LXrUdKWg3RgUa0dRTOtPU1mBjZVqOBUxloYWggiBaUin3FqY1FMw5FpxSmoafmoPswy1NNHUXokeGuaDkl2BshCAmkeCr2DDCouMjApFltgspqW9EePWnLHVhgasaOlKsYo8cVJKQGCVaTJUoLT0jvScgWV5WhotqnTLaojnWqxYUFjWjCCgRtUhZaSVgdnsS3SorGiTnWgtWijI8DT1piinA07CxzUNqdekIogQOQaUKnOabWGPV6lpKxg0W1Fy0KNqMppJGAyJeiRLTyKdatZhb0Jqc5pqgkgbk/E/AVjDQaNh8K0jBUVmY7KoJPyFbblT6PJJrSYi8Ue4W31jD/tH3+1dP4NwnDYYZY41X1tqT3J60ssqR0Y/HlLb0cw4J9GWIlAadxCp/dtmf49B99aVPorwlv8aYnv5fwy1upiAAb3/Cgy41B+v6VF5GdS8eC9rOT8d+j3EYcF4j48Y10FnA9V6/D5VmEIA10ruOI4mAQQdO1c++kThsRP7TDYXNpFHUnZgKHPk6Zz5/F4rlExj4m1XfLnKGIxpzDyR9ZG6/5R1rQcl/R6ZbT4lSE3WPv6t6eldUiw6ooUAKo2A0tRbS6Fw+Pe5GAj+izCKPPLIx6m9vwFUvHPozyoXwsha2uR9z7MP611LF2A96rMRPlGhpfUkjr/Z4NVRwF8OykhgQRoQdwacikVvOb8FHIfGW2fZgOvrbvVVhuUMZKLph2t0LWX/9G9P6lnnZMUoy49mbIppktVvxnlnF4cFpYHC/xCzAe+Um3xrOM1UhGyfFrsLNLeoTtc0ekEQqqVBEiopJpFWjrHelkwkdjSU8LQ2NZIUUV4ilBrxrGAqTejU0CnU4WMkS9BNSDUdt6wR0ZprU5Y6dkFYwxDrUihLoKejXoNWYJmpwNLhYGd1RFLMxsqgXJPpXUeUvo7RMsuLs7biIaov+f+I+m3vU5SUex4Qc+jIcr8mz4yzW8OH/ANxhv/kHX329661y7ynhsKB4aAv1kYXc/Hp7Cr6KIWAWwA2AsPupGNtNq55ZGztx4lH8jtqjzSgU6R6qOIYwDrUbLLYHiOM0Njb46VlMVxoD0NLxviY1tWKxuLJbS5YnQDUk9ABTRVlG+JdT8Za+/wCu1arlDlmeVxNOMse6o25O4JHSnci8lZcs+KF33VDsnYnu34V0lAAKwspgvDtpeomKb109Kl4ie1VGKxO9aUxYqyBxPiIWsjxDixv5bm50Hc1Y80G63Bsaqfo9wZxE5lfVYzZe2b+1Bb2VutG25X5dWNRLKA0pF9dlv0A71ftiO1FQaVHbKDT9Eu2RcTI2pOotqDXHvpE4AkbCeJcqufOo2Ddx2BrrHFcYACO9YTnOa8BzbEUYSqQuWCljdnKyaIDSOlMhFdh5RJjS9W+CgW1V0LCpUGMAqE7YrKevGvU9Vq4wOvGnlNrbnQDuT2rY8u/R5PNZ5z4CGxy2vKw9F2T/AFa+lDkltjxg5OkjG4eFnYIiszHZVBZj7Aamt7y79F88vnxL+An8IAaQj11sn3n0FdI4Dy7DhU+pRVB+0SCWa38T6k9fQdqsp5wo0Y/Aj8jUpZfsdMPGXuZnC/R7w1BbwzKdizyMT6mykKD8KrOL/R1gX/ww0La2KuWHxV73HoCK0U+IzHQ5f5rkfdtVXiMWymx+BGx/I1F5JezOxePjqmjlPM3Lc2CcLJ5kb7Eg+y3p/K3p+NUjNau24qFMVE0MmqsN+qn91we4P5VxnH4JopXiceZCVPb0I9CLH410YsnNb7OHyMPpvXRHIJqw4BwOfFSeHChP8R/dUd2PT8atuTuVJMdJYXSFf8SS3/1Tu34bnoD3DhHCYsPGIokCqOg6nuT1Pqa2TKo6XYuLC5bfRT8p8nRYNLjzSkeeQjU+i/wr6fO9aMQAD+wqQq0krgVyuTe2dqSWkQ5AR2I+VQJsaF0uVPY7VYu4+H6vVbj2XW9tutIOiDiuJaGsjxnipte/lva5Nhft+t6bxPEssgRNczZQpOoLGw+FRMTDJG6yyMPCyZGRBmz5XkPlJsup/eN/tHTpXTg8f1NvoSeXjpLZScQxpGmpZrWHU32sK330f8kmMjEYgDxW1VTb6sH/ALvwqHwGGGaPNEmRl3S3lVt1YKdBc9RY3vrtV9yVxaR5/BJZvKzMSxYLYjKfNci50tfXtpV8viOEG09EV5FzqS2biIKv6/KhS4sbAi/bY/fXp1J61Agwkk0hiRRouZ3Y6JmuF03JJU7bW16X4u3SKtqK5M9K/wB9VOMa2t6yfGuZ5sPOUaZSAxGRYrnKGIDOxbQafG9GxPNCOoDCxYXzIrMtzoLgXK3PuPWmyYHF02rFx+Qpbp0V3NOPKqepra8j8M8LDxgCxIzMe7NqazHBOW3xcyySf+XFnDAgiTqApB201rqkMYUWGmlqRFZMGzkDaqbG4wKdQQfX86uppLVR45c5yb3+7vWkzY0U8yyTkrGMx+QA9T0qp41yRipVA8WEfykt+OWt9w/BrEgVBYde5PcnrRJEpo62Gf1aOF8a5Vnw4vInl2zqQyfMbfG1Z2SC1fQ2JgGqsLobggi4II2IrjPOnBv2WawuYnuY2390J7j7x8atCbZ5+fx/T3HozRa1BL0+Q0O1XSOcU1b8C4DPijaJfKDZpG0Rfj1PoLmtTy7yMqkPizc9IVOn/wAjDf2XTTc7V0PCYdAoCgKoFlUWAA7ADYVCWVLSOrH4ze5aKflnliDC2KDxJT9qVhY+yDXIPbXuTWtjZVW7L8wCPnVccRGmmYH3A0NtP661T4zioufMb9/u36/71Byb2zujjVUui/xePjIsrBT6Gx/I9PSoH/ECN7Eenw3FZGeYE5tep+VAPFwNyd7Dba2t/wC1bZZRijaftCkabHoe1VHEYtDlsR0B6HtfqPwqlw/GlP73+9F/4uDpelAR4+JWNjp312Iqu4jwB8di4BHpnUiVtwoiIBc+uVlA9bVG4pJ5yRsdfz+Na36M+IgNMt+in2sWv+P3U0ZcXaEyxU48Wbzg/CY8PEkUShVQWAHXuT3JNyT3NTlt7/rQVk+I84QJYlyEIBDhXKkHYhgpFjTMLx+KcfVYlDbfy+mw10oK3slx3xNRjcai7H5VTYjiY6fr9freq/F4PEyAmIIw9GytftZj99ZrGyTwkCaN0vpdh5T/AKh5T86ErspCKNVJxQEH9d/18ao8RxO5tqSdFA1ux20+H31ST8YVTZmGvTc/IbfGoGE5uwsOctFLLIwK5g2RUDaHKFN81tL3HX4NHHJq6BPLCOrJfMvBcXhXSZlBJTxMu5RWFlfsSDe46EX1GtG5Dx7YhGhaMuiMbG2hBN1AP8S6/BhWtPMeA4myyoJTIoytEWKkIOnlO/mupB3HvUXjTthmP7O/hRSZrK0LMQwAucyC6HrYknynU16Pj5KfFJnDN2uTZSc3TvhGAw8LRu2h00IH8oBuDfrsVGnWm8iT4uCUNJFIqSOAzSL4Yc9gXsLjoBtVFxbHTqFEqRsjeeNin29PtK58xAuRvpamQc04j/CjAsbWCohYdLLZexOnvVM0VkdN0isG0uSp/J3RsUpNswvtYEbjcCsfxfj74OXGNfL4kaohX7QzIoU+lrPY9xWZ4Lw7ElnklLQqNSM/hvIALhL3+rQXJuRfXQa6XXHMXBiFV2BJvkZojnRkJ+yrMFLsDrYDTza61xz8eUJfTdAlNSjVqzmsvDWSRZGGYNmItrc3OhPQk29aDiuIGIFEJBIKtp+64IK67aH5H1rQ46CVI5EfyqbmOIxEXUZfMx/dZdLk330rK4nDvcjLqdrG5Nzaxt3J0uBvSxVv6vYg24qkXvKXE5E8viFUJ0KtqjWJWw6gmwI1GoPeu3cu4kyYdCXEja5iBaxuTa3SwrD4LkrCrh1uHVri7hjnvYXLKbqAbdBpfetXy9w6GJMsDkgm+rX1qeSP1WujtxwlCFSLPGyWuOtVOAkLSt6AX+dE41Iw82vr1H507lWLOryEaF7D1yj871CrkWuo2XC7daBPNboflVkRQJkv0qzIKWyixOKqg5kwa4jDSQka2LIequtypH4exPetbi8GrX6adN/1tWb4whijck6ZTZh3A6+tKm0yjlGSo4VY0uWpmIg/e76/PWotdiPIPpM4KOxDKh/09vUC9U/EeX45AWileI/ysWW57qdvYEdK0LOTvtSeCu9gT3tXHxZ6ilRyvjOAxkFyQZU/iS5+a7j8KpJMZKdcj/8AS35V3HKOwppgX+EfIUaHWQ4O/EnHp91QpcSb36dq75NwuF/tRofgKoeI8j4STUJkPddK3QymcfDkny0VZmBsTWp4vyBPFd4W8Qb22asdHg5nmEIRhITaxFvifT1opWFtImGOSd0hiGZ3Nh6DqT6DvWwh4YiqcDBIMoyDFSD7Uksr+GsdwdEXUkDfKR3vf8A4ImBhkIGabwyzN+8SAbL0yrcaa9RvWA5exRgxipN5UzXcX0EmVkVmP8uc+16STfF8fb+ortps2H0k8qYiFFYzK0KooVAAuRsrJfMdSt/DXfeRdBvXKMJiMhva+oup+yy2Nwet9rGvqXivDF4hgfDuA9rqezrpr6HUH39K+f8AGcvZMRlkDBHMivYeeGZQ3lYAWtnAI0CkMLbVSDhGPw9nJynOXyi25C4gFx8IjuEkRlIubWClvML/AGgwX5UXnPnKfFSNhsCHMY8skiAkv08pGyaHXrbtvVcOwoRXHihMsRVpQDlU5SAq5d21sG7npqam8tcUY/UYZvAw6DMXyBmYgqM0rbXJIAuLDQVJZIpOX2O3JBtpN9mf/wDCMqgOWSRb+ZYpUZ7AXbY72v1qDxKGBmCwxlArNmJYksLnLvqDa1/Wum8t4UmRy6eVfFIWxCyk5QWYX0JF9Ouas99IUEC4iOSMBQwCSqlgFZR0NrXtb5VseeU579uhvRxqNV+TGcAxbQYpHQ7OAR/ErGzDTcWvXfOGEWkzBGBjYMHGZbEdR1tXMeVOXsBLK7SztBkKvHnIYNY6oxCjdra6adDWz43xaNYnSJ4/FksgDvlQhyUZ84I8oGc3B39dK675TVexwOLjF2jPPGXhBaMIqSKn7wXMyEhWswslh3NgNdr1Z46TB4JWkQAtlVi6tmcHQKsdzopt8bXNVeLiVisLSFY0iDP6yCO5yKdLKHAud8wHTSLx3G4NY4o1iuoDMVUhcx+yuY730Nzr8rCu6SlOpPr9f9C4KjFwvf6EvEY+HG4fDl3kWSSZlkiVlyCFX80j6ZiSllGtsxParjDYWJYVlmDK6sSqgDKiMRkG4I0zajYt6VC+jzlxirTzLaNmHhR6BmVGY2BNvJc9tbXromFweXzCONSPNncs/mN9TcKNu1vuqWXI26tGjjjFLTK7mNMJNg4442uJMwDhvONDdWYea1swIPfWsBy3yLNNK5cGNI2YKdSzsp0y32Q2G/e1bXjgdScQrx+IxDMGKpG4AsSBfVvv3o/AuYxorK2ZmY5tMls1wL7ne2g6Vz5XyVpDwxcfkznFN3CswysQMrEXUbbGx0tWfwnEJA7KZWD+V1HmzWzG5YW9B/1VqeMRZMXYWCSg6aaSAliB7i5+FVmMw0CSqS/1igkhdSVNswsAb+UFrb2B1qELfR6japMsOXeNT4iR4HXMBaz2KmzAEE9Dv6H5VvsHGkaKi6BRb+9ZblLBlmeYKEWTLYdkA8v+o5tTWyRfSlXZyZe6BPIPWoxmG1/0amOgqHLhAf17UWRElN6z/MyZoZU7hgO98uhqwlYx6HUfhrp/Wq7j8wMLnchTtrr+gflQXYaOJyIWAAqNJg2HSrXgyg2rR/8AD1YdKZ5eDPLs62QacDR2UUEisenZ6vEU8QHekK1gpgcl6GwNSRXiK1B5EYCoU/DI2fxLZZBcBwBfXfcWNWRFDfek7GTKXF4KVWup+rOj2Jv1s1tyRtcnr03rm2P5bljdgYpDqcrpqCNOljcbfOuxF7UG+o6gW0+I/KleiikZPl/mfEQoE/5iwtkCQjNoosGeQ2Kk23G3rUqDlzE4pjJinyKxzNfK0zkgDVgABoALKNALCtJhphoLC/v+v18qmWv6D9fIVOMF77C3TtKjl3P3Cmt4OGiIghsDYHzSyjfU3bcDrtVDynw10lS6nNmFlYEX81jv8fiPStHzNi/+akVpDEgIOguO4KgHVtunUa1l8NxwxyRkEkBryMxPm82ZkU763N/f1NUwuU1KLqv4i5FxafudA4lK2cGONi6MSLggXNlIv1sL61jvpA4ayRo5ZRd2YoT5mZyCSAN/6Cr3i/PyLhi0JvIxsEbQrfdiOorAQcSSaQviHlkc9rAew129BVoeFixfUm2/zo37ROf0NVf8yuOKe25t10+69DixTKb7W19/T7/hvV3juKQMmVIyuUggbBradDrVXhsKZZNF0320FVtRNKDdKMrPYfGshBU2Hbcd9mvf2rUcDhfFzrNirmNQVBVB9kG6rkBsB7Vd8u8tYZY1d4WkJFyzmyj2UHah8y4GPwxJh1ETpsqXysLgeZToTrvU3/6MbUboMPEp29mmm4kuUuGLvGoygv4ccewYeUX0BPWqrE81xYd9EzqcuU5iyqSNSWckm5uazfM+KZcPEiNHle/iBbX8RCNTrcDtttVHIv1UV13B1JPepPLz+pPV0dawxjcWulZ1LmDh2KKCVC6lsjJ5wUQ2BI072PteqrlPDySYm6KvlGRntewB1Pqx2v6fGqMc3ynDRwMQ+XQXOttluetdS5VgRcNEUXLnVWPuRrRyZHKok5Q4K32XUWESw8i39hVPxflbCzG7QqG/iTym/rb7Xxq+UV4resvg5L2QIMMY1AW1hp2qes2ux19KQrUecml6BfImPrUaY/r30ocU5Ht/amYmXTT9e9ML7gp9b3FZLmZikb6+Ug+40KkVpzKCD7fn/SsbzzNbDyDpbT3P6++tHs3RyjhUpFq1uC4jYd6x2Faxq6wr6U+aKbPMej6BU3oip6U2NakolY7xgpbCnlbUlqwQMkQoFFkY0JqCCMJoZF68WO1DBNIOhri1Ala1Fc1GlpWMmNYm91Yr+B96mwSHTMPjqRf+lVhap/BcYL+Gxt2P9KWtj8qRled+EsQZ41DDI2cCxbyg6i/60rkAjA1Y3/D413HjvHY18XDxq8hsVY7ICRY3J96wPDOWFl+rw6+IR9qaS4jTv/m9q6cOGVOVVZKfkQWn7GSwkHnGY2BBsAuYkHTQdKteC8tYaWOVmxqxSoyiOF11cE+Yk36Dten8yYSOJ1ggZpH/APVmIIuR0jHRBeqviPDMgRibm9mPrvVOSi9klLm6NVhuRI3YH9qDhdwq+a3obmgLgUhkeJCSM2pJ83oDbT1+NPmwjQ4LD43DOVNykovfUEhdO350LgcpmxX1ujSb9iehFc3k5YSwtx9v7Hd48ZKbNFgySu5A2G9qfxmExxMSyEZQxNxpc2tr1qbjMD4akg2VBc+vp71d8u8IixMHg4lUzNd4xcFnXobDtqK8jw/Gl5U3KL0jqzZ44Umzj/M3gl7QAqthmu2c369NB+dH4bIrRWltZAGRNmZQbEDuddB1rTc18omEOkSWW9z3NtrX/Cs3w2SKJAcpMiEjXuToddiK9TJhlHGo03XRsWRTyc4tJNf9+f8AI6HhYEwZRdftAPobX0Fu9ds4KyiJFQ3CqBf2rjPC+H4rEy51RjrcaWF9rk9a6zyxwqSGMBj5ibnt7VOKkpq96F8iUONLWzTx061RkzinpIw3A+FdKZ51BSKjTJ1qV4o/3qNM4rPoy7K6QW2pIsRrY16c61BmNjekuh3G0LxEEDMt7dvyrB87Yu+HbU66D3P6tW7/AGgZda5rz3EU8hO7XHtbX5HSqQW7IZG1FmHwxtVvh5xaqMtUiKQ9KpOPuec0fUUSVJg0qJ44tTDiamd5OZhehSgdKhHE62r3jHoaNhoWc0EmhSya15XoDIR5aEXprCmkUowpNNcUpakBpWayLLFUeaPqN6sXGlRmFKOnZz7ieJijnWGdmCG7F7mzEn970oXM/Nw8P9mwYKx7FgLF/QW2WtLzJy6mJAB0N9DWW5rwU8awr+zRBYVyh4xYv3Zx1NdMM7SUezmnh22iBwbiUmGyy5gZEuwz+Yf5fY3rWcY4iOI8NknsiurZ2CgaEC1r9a5tiJyynTLrWk5dJXA4iJnCAkEa3LFrDbsBc0M2OEmpLsiuSdoxwxcmXLnbJe+W5y375dr0XD45lsQTdTmU9iKfhsI1iChIBOoFyNd6mJwkG7ZZrW0+rOvxppOHTO/HGbSlF9nYOTMdHi2iOjIEDSg662+zVPgZ7cSmkh8qJIxjUbKA1rDsCBWb5a4jiMHHeCFVYqczk6kHYFT1FaLhUEmsqPdityMvU/ujvTePgx4IcIv5KNyk7a9qOrcSigxWHEjMEOW4Y6WNutcf45hsOwK+G0j3JjkUZUYg9hq33Vd4LgOJmH1rsi3uVJNtf5dq1HCuBxwAWuxGxJva/btWfkaqJGGGON23fwA5PwbR4dVdbHt7960EIHWhA0Ra5thm23Y+vV6vXqhMQ1GlANSHNRJHpWNEh4qIjbWq6aQVZvJVdj4b6jeptFU/uQWk1rE/SPqI3P8AMDf11t91aibEakdaynPb54oxpfN8vKRpVsZDyP3Wc/HSrDhyAnWvS4X+1NhFjVJStaPObs+gWnB6039rt1qsiNPeuez0+KLE4sXp3jdRVN3okDGtZuKLUPfWlElR4T+FPNFsFBQ1NvTelKtLZhMutLavGnVqMeoMqUZaUigxo6K+dDUoIrizAGnSDSkhoUU7RlOYuTIpASgyt6bVC4R9HI0MjfAVviKnQjQUE31YaRWcO4FDCuVUHrpUpMMvRQPhUx6GtCqCnoitwuM7op+FTIolUAKoHtTqcKdL3FbHBb70RVpop4pibFtS0gpDWsU8XppegNXqzHURJZKiM96JPUYmtYyEkeocstFmqFMaU1FfxaIWzDfrWK5mlDKo10b763eJ+yfauacxHWq4+jnz/uldjMQANKhwuSaBJvUvDbVSuKOCtH//2Q==",
    coordinates: { latitude: 6.6828, longitude: 80.3990 }
  },
  {
    id: "kegalle",
    name: "Kegalle",
    nameSinhala: "කෑගල්ල",
    nameTamil: "கேகாலை",
    province: "Sabaragamuwa",
    description: "Hill country gateway with rubber plantations and elephant orphanage.",
    topPlaces: [
      { name: "Pinnawala Elephant Orphanage", 
        latitude: 7.3012, 
        longitude: 80.3881,
        description: "World-famous elephant sanctuary", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" },
      { name: "Alagalla Mountain",
        latitude: 7.2345, 
        longitude: 80.4567, 
        description: "Hiking destination with panoramic views", 
        imageUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400" },
      { name: "Belilena Cave", 
        latitude: 6.9958, 
        longitude: 80.4350,
        description: "Prehistoric cave with ancient remains", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" }
    ],
    hotels: [
      { name: "Hotel Elephant Park", type: "luxury", description: "Upscale hotel near Pinnawala", priceRange: "$120-250" },
      { name: "Pinnawala Guest House", type: "budget", description: "Simple accommodation near elephants", priceRange: "$15-30" }
    ],
    historicalSignificance: "Kegalle was part of the ancient Maya Rata kingdom. The area is known for its prehistoric caves and colonial-era rubber plantations.",
    mustTryFood: ["Rubber Estate Rice and Curry", "Pineapple Dishes", "Fresh Buffalo Milk", "Traditional Sweets"],
    travelRoute: "From Colombo: Take the A1 highway toward Kandy, turn at Ambepussa (1.5 hours). From Kandy: 1 hour west.",
    imageUrl: "https://media.istockphoto.com/id/108272930/photo/elephants-bathing-pinnawela-sri-lanka.webp?a=1&b=1&s=612x612&w=0&k=20&c=Tn_lRi8Xo_8iLUY7KUC0Btq0YJgSOu6qEQmzCY7W4WQ=",
    coordinates: { latitude: 7.2513, longitude: 80.3464 }
  },
  {
    id: "kurunegala",
    name: "Kurunegala",
    nameSinhala: "කුරුණෑගල",
    nameTamil: "குருணாகல்",
    province: "North Western",
    description: "Ancient capital with the iconic Elephant Rock.",
    topPlaces: [
      { name: "Ethagala (Elephant Rock)",
        latitude: 7.4870, 
        longitude: 80.3649, 
        description: "Iconic rock formation above the city", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" },
      { name: "Ridi Viharaya", 
        latitude: 7.5617, 
        longitude: 80.4858,
        description: "Silver temple with Kandyan-era paintings", 
        imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Aththanagalla Temple", 
        latitude: 7.1147, 
        longitude: 80.1245,
        description: "Ancient temple with meditation caves", 
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" }
    ],
    hotels: [
      { name: "The Lake House", type: "luxury", description: "Boutique hotel overlooking Kurunegala Lake", priceRange: "$100-200" },
      { name: "City Resort", type: "budget", description: "Clean central hotel", priceRange: "$25-50" }
    ],
    historicalSignificance: "Kurunegala served as the capital of Sri Lanka in the 13th-14th centuries after Polonnaruwa fell. The name comes from the giant rock that resembles an elephant.",
    mustTryFood: ["Kurunegala Kevum", "Mung Ata", "Fresh Water Fish", "Traditional Sweets"],
    travelRoute: "From Colombo: Take the A6 highway (1.5 hours). From Kandy: 1.5 hours via Ambepussa. Accessible by train and bus.",
    imageUrl: "https://images.pexels.com/photos/34216510/pexels-photo-34216510.jpeg",
    coordinates: { latitude: 7.4870, longitude: 80.3649 }
  },
  {
    id: "puttalam",
    name: "Puttalam",
    nameSinhala: "පුත්තලම",
    nameTamil: "புத்தளம்",
    province: "North Western",
    description: "Coastal district with lagoons, salt flats, and the unique Wilpattu park.",
    topPlaces: [
      { name: "Wilpattu National Park",
        latitude: 8.4371, 
        longitude: 80.0044, 
        description: "Largest national park with natural lakes", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" },
      { name: "Kalpitiya",
        latitude: 8.4371, 
        longitude: 80.0044, 
        description: "Kitesurfing paradise and dolphin watching", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "St. Anne's Church", 
        latitude: 7.9701, 
        longitude: 79.7345,
        description: "Historic Catholic shrine by the lagoon", 
        imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" }
    ],
    hotels: [
      { name: "Bar Reef Resort", type: "luxury", description: "Eco-luxury on Kalpitiya peninsula", priceRange: "$200-400" },
      { name: "Dolphin Beach Resort", type: "budget", description: "Kitesurfing camp and accommodation", priceRange: "$30-60" }
    ],
    historicalSignificance: "Puttalam was an important port during the colonial era. The area has a unique mix of Sinhalese, Tamil, and Muslim communities.",
    mustTryFood: ["Lagoon Crab Curry", "Salt Fish", "Puttalam Shrimp", "Palmyrah Products"],
    travelRoute: "From Colombo: Take the A3 highway north (3 hours). From Anuradhapura: 1.5 hours west. Kalpitiya is accessible via a causeway.",
    imageUrl: "https://t4.ftcdn.net/jpg/01/31/66/43/240_F_131664389_eoPUU3KQ4LNV1jHef2A8v9PMHNpt8a4c.jpg",
    coordinates: { latitude: 8.0392, longitude: 79.8283 }
  },
  {
    id: "mannar",
    name: "Mannar",
    nameSinhala: "මන්නාරම",
    nameTamil: "மன்னார்",
    province: "Northern",
    description: "Historic island district with unique geography and ancient baobab trees.",
    topPlaces: [
      { name: "Adam's Bridge", 
        latitude: 9.0683, 
        longitude: 79.5284,
        description: "Chain of limestone shoals to India", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" },
      { name: "Giant Baobab Tree", 
        latitude: 8.9814, 
        longitude: 79.9142,
        description: "700-year-old African tree", 
        imageUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400" },
      { name: "Mannar Fort",
        latitude: 8.9772, 
        longitude: 79.9044, 
        description: "Portuguese-Dutch colonial fort ruins", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" }
    ],
    hotels: [
      { name: "Mannar Guest House", type: "budget", description: "Simple accommodation in town", priceRange: "$15-30" }
    ],
    historicalSignificance: "Mannar was a key trading post for pearls and horses. The baobab trees were planted by Arab traders. Adam's Bridge is linked to the Ramayana epic.",
    mustTryFood: ["Mannar Crab", "Palmyrah Dishes", "Dried Fish", "Unique Local Curries"],
    travelRoute: "From Colombo: Take the A3 and A14 highways (6 hours). From Anuradhapura: 2 hours via Medawachchiya. The causeway connects Mannar Island to the mainland.",
    imageUrl: "https://t3.ftcdn.net/jpg/15/37/52/00/240_F_1537520085_pfUp7rS3k6RDj3fI8DKC4rJUiUuXoTjw.jpg",
    coordinates: { latitude: 8.9810, longitude: 79.9044 }
  },
  {
    id: "vavuniya",
    name: "Vavuniya",
    nameSinhala: "වවුනියාව",
    nameTamil: "வவுனியா",
    province: "Northern",
    description: "Transportation hub and gateway to the Northern Province.",
    topPlaces: [
      { name: "Vavuniya Tank",latitude: 8.7541, longitude: 80.4950, description: "Ancient irrigation reservoir", imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Mamaduwa Temple",latitude: 8.8412, longitude: 80.5234, description: "Ancient Buddhist temple", imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Kandaswamy Kovil", latitude: 8.7512, longitude: 80.4981,description: "Hindu temple in the town center", imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" }
    ],
    hotels: [
      { name: "Cargills Square Hotel", type: "budget", description: "Modern hotel in town center", priceRange: "$25-50" }
    ],
    historicalSignificance: "Vavuniya has been a crossroads for northern Sri Lanka for centuries. It serves as the main entry point to the Jaffna Peninsula.",
    mustTryFood: ["Northern Style Crab", "Jaffna Curry", "Local Rice Dishes", "Fresh Fruits"],
    travelRoute: "From Colombo: Take the A9 highway (5 hours). From Anuradhapura: 1.5 hours. Train service connects Vavuniya to Colombo and Jaffna.",
    imageUrl: "https://www.allceylon.lk/images/location/2017/10/Vavuniya-Railway-station-1509073231.jpeg",
    coordinates: { latitude: 8.7542, longitude: 80.4982 }
  },
  {
    id: "mullaitivu",
    name: "Mullaitivu",
    nameSinhala: "මුලතිව්",
    nameTamil: "முல்லைத்தீவு",
    province: "Northern",
    description: "Coastal district with pristine beaches and fishing communities.",
    topPlaces: [
      { name: "Mullaitivu Beach",
        latitude: 9.2707, 
        longitude: 81.3175, 
        description: "Uncrowded pristine beach", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Vedda Rock Caves", 
        latitude: 9.1567, 
        longitude: 80.9845,
        description: "Ancient indigenous cave dwellings", 
        imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" },
      { name: "Nandikadal Lagoon",
        latitude: 9.3142, 
        longitude: 80.7856, 
        description: "Serene lagoon with birdlife", 
        imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" }
    ],
    hotels: [
      { name: "Mullaitivu Rest House", type: "budget", description: "Basic government accommodation", priceRange: "$10-25" }
    ],
    historicalSignificance: "Mullaitivu has a long history as a fishing settlement. The area has seen recent development after the end of the civil conflict.",
    mustTryFood: ["Fresh Seafood", "Northern Crab Curry", "Local Fish Varieties", "Palmyrah Sweets"],
    travelRoute: "From Vavuniya: 2.5 hours via Oddusuddan. From Trincomalee: 4 hours via the coast road. Limited public transport available.",
    imageUrl: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600/https://exploresrilanka.lk/wp-content/uploads/2012/12/15.webp",
    coordinates: { latitude: 9.2671, longitude: 80.8142 }
  },
  {
    id: "kilinochchi",
    name: "Kilinochchi",
    nameSinhala: "කිලිනොච්චි",
    nameTamil: "கிளிநொச்சி",
    province: "Northern",
    description: "Agricultural district transitioning from conflict recovery.",
    topPlaces: [
      { name: "Iranamadu Tank",latitude: 9.3333, longitude: 80.4167, description: "Massive reservoir for irrigation", imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Kilinochchi Water Tower",latitude: 9.3878, longitude: 80.4042, description: "Iconic reconstructed landmark", imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" },
      { name: "Murukandy Temple",latitude: 9.2567, longitude: 80.4123, description: "Ancient shrine on the A9 highway", imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" }
    ],
    hotels: [
      { name: "Kilinochchi Inn", type: "budget", description: "Basic accommodation for travelers", priceRange: "$10-25" }
    ],
    historicalSignificance: "Kilinochchi was historically an agricultural center based on massive ancient tank systems. The area is rebuilding after decades of conflict.",
    mustTryFood: ["Traditional Northern Rice", "Red Rice Dishes", "Local Vegetables", "Palmyrah Products"],
    travelRoute: "From Vavuniya: 1.5 hours north on the A9. From Jaffna: 1.5 hours south on the A9. Located midway on the main highway.",
    imageUrl: "https://propertyguide.lk/_next/image?url=https%3A%2F%2Fpropertyguide-store.s3.ap-southeast-1.amazonaws.com%2Fikman%2Fmedium_Kilinochchi_War_Memorial_11145cb76d.jpg&w=640&q=75",
    coordinates: { latitude: 9.3803, longitude: 80.3770 }
  },
  {
    id: "badulla",
    name: "Badulla",
    nameSinhala: "බදුල්ල",
    nameTamil: "பதுளை",
    province: "Uva",
    description: "Uva province capital with waterfalls, tea estates, and colonial history.",
    topPlaces: [
      { name: "Dunhinda Falls",latitude: 7.0163, longitude: 81.0633, description: "Spectacular waterfall with mist spray", imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Muthiyangana Temple",latitude: 6.9856, longitude: 81.0581, description: "Ancient Buddhist temple", imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Ella Gap", latitude: 6.8722, longitude: 81.0453,description: "Stunning views of southern plains", imageUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=400" }
    ],
    hotels: [
      { name: "Heritance Kandalama", type: "luxury", description: "Geoffrey Bawa masterpiece nearby", priceRange: "$300-600" },
      { name: "Badulla Rest House", type: "budget", description: "Government rest house in town", priceRange: "$15-30" }
    ],
    historicalSignificance: "Badulla was a regional capital under the Kandyan kingdom. The area is famous for the 1818 Uva Rebellion against British rule.",
    mustTryFood: ["Uva Highland Tea", "Upcountry Vegetable Curry", "Fresh Dairy Products", "Pittu"],
    travelRoute: "From Colombo: Take the A4 via Ratnapura and Balangoda (6 hours). From Kandy: 3 hours via Mahiyangana. Scenic train also available.",
    imageUrl: "https://images.unsplash.com/photo-1550679193-d8ec2f2c3a25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhZHVsbGF8ZW58MHx8MHx8fDA%3D",
    coordinates: { latitude: 6.9934, longitude: 81.0550 }
  },
  {
    id: "monaragala",
    name: "Monaragala",
    nameSinhala: "මොණරාගල",
    nameTamil: "மொணராகலை",
    province: "Uva",
    description: "Rural district with ancient temples and Udawalawe National Park.",
    topPlaces: [
      { name: "Udawalawe National Park", latitude: 6.4744, longitude: 80.8906,description: "Best elephant viewing in Sri Lanka", imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" },
      { name: "Maligawila Buddha",latitude: 6.7412, longitude: 81.3654, description: "Giant standing Buddha statue", imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Buduruwagala Temple",latitude: 6.6492, longitude: 81.0811, description: "Seven massive rock carvings", imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" }
    ],
    hotels: [
      { name: "Grand Udawalawe Safari Resort", type: "luxury", description: "Safari lodge with pool", priceRange: "$150-300" },
      { name: "Elephant Trail Hotel", type: "budget", description: "Near Udawalawe entrance", priceRange: "$30-60" }
    ],
    historicalSignificance: "Monaragala has been inhabited since ancient times with many ruins from the Anuradhapura and Polonnaruwa periods. The giant Buddha statues are unique.",
    mustTryFood: ["Village Style Rice and Curry", "Fresh River Fish", "Wild Game (legal varieties)", "Local Fruits"],
    travelRoute: "From Colombo: Take the A4 highway (5 hours). From Ella: 1.5 hours. From Hambantota: 2 hours via Wellawaya.",
    imageUrl: "https://media.istockphoto.com/id/491685374/photo/foogi-morning-on-adams-peak.webp?a=1&b=1&s=612x612&w=0&k=20&c=4brOIser0xrasRHJrNAbgDWd2SSTTB-faD1V-mIdxVQ=",
    coordinates: { latitude: 6.8715, longitude: 81.3487 }
  },
  {
    id: "ampara",
    name: "Ampara",
    nameSinhala: "අම්පාර",
    nameTamil: "அம்பாறை",
    province: "Eastern",
    description: "Eastern district with ancient temples and unspoiled beaches.",
    topPlaces: [
      { name: "Arugam Bay", latitude: 6.8417, longitude: 81.8312,description: "World-class surfing destination", imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" },
      { name: "Deegavapi Stupa",latitude: 7.3044, longitude: 81.7486, description: "Ancient Buddhist shrine", imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Gal Oya National Park",latitude: 7.4363, longitude: 80.6975, description: "Unique boat safaris on Senanayake Samudra", imageUrl: "https://images.unsplash.com/photo-1540206395-688085723adb?w=400" }
    ],
    hotels: [
      { name: "Gal Oya Lodge", type: "luxury", description: "Eco-luxury in the national park", priceRange: "$300-500" },
      { name: "Arugam Bay Surf Resort", type: "budget", description: "Popular surf camp", priceRange: "$20-50" }
    ],
    historicalSignificance: "Ampara was the site of the ancient Digamadulla kingdom. The Deegavapi stupa is mentioned in Buddhist chronicles as being visited by Buddha.",
    mustTryFood: ["Fresh Lagoon Crab", "Eastern Style Seafood", "Tropical Fruits", "Local Arrack"],
    travelRoute: "From Colombo: Take the A4 highway via Ratnapura and Monaragala (6 hours). From Batticaloa: 2 hours. Accessible via Wellawaya from the hill country.",
    imageUrl: "https://images.unsplash.com/photo-1552055569-d54ae89a11b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1wYXJhfGVufDB8fDB8fHww",
    coordinates: { latitude: 7.3018, longitude: 81.6747 }
  },
  {
    id: "matale",
    name: "Matale",
    nameSinhala: "මාතලේ",
    nameTamil: "மாத்தளை",
    province: "Central",
    description: "Spice garden district connecting Kandy and the Cultural Triangle.",
    topPlaces: [
      { name: "Aluvihara Temple", 
        latitude: 7.4914, 
        longitude: 80.6231,
        description: "Where Pali Canon was first written", 
        imageUrl: "https://images.unsplash.com/photo-1562696271-05800309c6e7?w=400" },
      { name: "Sri Muthumariamman Temple", 
        latitude: 7.4761, 
        longitude: 80.6258,
        description: "Colorful Hindu temple in Matale town", 
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" },
      { name: "Sembuwatta Lake",
        latitude: 7.4363, 
        longitude: 80.6975, 
        description: "Beautiful lake in the hills", 
        imageUrl: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=400" }
    ],
    hotels: [
      { name: "Taj Kandy", type: "luxury", description: "Nearby luxury option in Kandy", priceRange: "$200-400" },
      { name: "Matale Green View", type: "budget", description: "Guesthouse near spice gardens", priceRange: "$15-30" }
    ],
    historicalSignificance: "Matale was the site of the 1848 Matale Rebellion against British rule. The Aluvihara temple is one of the most important sites in Buddhist history.",
    mustTryFood: ["Fresh Spices and Curry", "Matale Kokis", "Traditional Sweets", "Spice-infused Tea"],
    travelRoute: "From Kandy: 30 minutes north on the A9. From Colombo: 3 hours via Kurunegala. From Sigiriya: 1.5 hours south.",
    imageUrl: "https://images.unsplash.com/photo-1749528090068-43d71aac0589?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hdGFsZXxlbnwwfHwwfHx8MA%3D%3D",
    coordinates: { latitude: 7.4675, longitude: 80.6234 }
  }
];

export const provinces = [
  "Western", "Southern", "Central", "North Central", "Eastern", 
  "Northern", "North Western", "Uva", "Sabaragamuwa"
];

export const getDistrictById = (id: string): District | undefined => {
  return districts.find(d => d.id === id);
};

export const getDistrictsByProvince = (province: string): District[] => {
  return districts.filter(d => d.province === province);
};

export const searchDistricts = (query: string): District[] => {
  const lowerQuery = query.toLowerCase();
  return districts.filter(d => 
    d.name.toLowerCase().includes(lowerQuery) ||
    d.nameSinhala.includes(query) ||
    d.nameTamil.includes(query) ||
    d.description.toLowerCase().includes(lowerQuery)
  );
};
