
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, breedName } = await req.json();
    
    if (!prompt && !breedName) {
      throw new Error('Either prompt or breedName is required');
    }

    const RUNWARE_API_KEY = Deno.env.get('RUNWARE_API_KEY');
    if (!RUNWARE_API_KEY) {
      throw new Error('Runware API key not configured');
    }

    // Create a detailed prompt for breed images
    // If no custom prompt provided, create a default one
    let imagePrompt = prompt;
    if (!imagePrompt) {
      // Comprehensive list of cat breed names from all our data sources
      // Includes breeds from catStandards (smallCats, mediumCats, largeCats, exoticCats, rareCats) 
      // and showCatBreeds data
      const catBreeds = [
        // Small cats
        'Devon Rex', 'Cornish Rex', 'Singapura', 'Korat', 'Munchkin',
        // Medium cats - Traditional breeds
        'Persian', 'Siamese', 'British Shorthair', 'Russian Blue', 'Abyssinian', 
        'Scottish Fold', 'Burmese', 'Birman', 'Turkish Angora', 'Manx', 'Bombay',
        'Chartreux', 'Tonkinese', 'Havana Brown', 'American Curl', 'American Wirehair',
        'European Shorthair', 'Colorpoint Shorthair', 'Oriental Shorthair', 'Balinese',
        'Javanese', 'Ocicat', 'Japanese Bobtail', 'Egyptian Mau', 'Selkirk Rex', 'LaPerm',
        // Medium cats - Modern breeds
        'Bengal', 'Somali', 'Turkish Van', 'Exotic Shorthair', 'Himalayan',
        // Medium cats - Specialty breeds
        'Sphynx', 'Peterbald', 'Donskoy', 'Khao Manee', 'Snowshoe',
        // Large cats
        'Maine Coon', 'Norwegian Forest Cat', 'Ragdoll', 'Siberian', 'Neva Masquerade',
        'Ragamuffin', 'Savannah', 'Kurilian Bobtail',
        // Exotic cats
        'Pixie-bob', 'Chantilly-Tiffany', 'Burmilla', 'Cymric',
        // Rare cats
        'Toyger', 'California Spangled', 'Australian Mist', 'British Longhair',
        'Oriental Longhair', 'American Bobtail', 'Maltese'
      ];
      
      const isCatBreed = catBreeds.some(catBreed => 
        breedName.toLowerCase().includes(catBreed.toLowerCase()) || 
        catBreed.toLowerCase().includes(breedName.toLowerCase())
      );
      
      if (isCatBreed) {
        // Create breed-specific prompts for cats with unique characteristics
        const catBreedSpecificPrompts = {
          'Arabian Mau': 'Professional studio photograph of a purebred Arabian Mau cat, distinctive silver spotted tabby pattern with clear black spots on silver background, medium-sized athletic cat from UAE, short smooth coat, green or gold eyes, alert expression, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Bambino': 'Professional studio photograph of a purebred Bambino cat, completely hairless Sphynx-type cat with very short dwarf legs like Munchkin breed, wrinkled pink skin, large prominent ears, compact muscular body on short stubby legs, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Chausie': 'Professional studio photograph of a purebred Chausie cat, large wild hybrid cat breed, brown ticked tabby coat pattern, very long athletic legs, tall lean build, jungle cat ancestry, large ears with slight tufts, wild feral appearance, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Dragon Li': 'Professional studio photograph of a purebred Dragon Li cat, Chinese Li Hua Mao breed, golden-brown mackerel tabby pattern with black stripes, sturdy muscular build, round broad head, thick ringed tail with black tip, amber eyes, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Dwelf': 'Professional studio photograph of a purebred Dwelf cat, completely hairless with distinctive curled-back ears like American Curl combined with very short dwarf legs like Munchkin, wrinkled skin, large prominent eyes, unique elf-like ear curl, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Exotic Shorthair': 'Professional studio photograph of a purebred Exotic Shorthair cat, flat Persian-type face with extremely short plush teddy-bear coat, very flat nose, large round copper or blue eyes, cobby stocky body, "Persian in pajamas" appearance, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Highlander': 'Professional studio photograph of a purebred Highlander cat, distinctive curled-back ears and naturally bobbed short tail, large muscular spotted or classic tabby coat, wild lynx-like appearance, tufted ear tips, powerful build, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Lykoi': 'Professional studio photograph of a purebred Lykoi werewolf cat, sparse patchy coat with bald patches around eyes and muzzle giving werewolf appearance, coarse wiry hair texture, yellow or amber eyes, unique roan coat pattern, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Mekong Bobtail': 'Professional studio photograph of a purebred Mekong Bobtail cat, colorpoint Siamese-type pattern with dark points on face ears legs and naturally kinked short tail, bright blue eyes, semi-foreign body type, cream body with dark points, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Minskin': 'Professional studio photograph of a purebred Minskin cat, mostly hairless body with fur only on face ears legs and tail points, very short dwarf legs like Munchkin, large ears, sparse coat on extremities only, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Minuet (Napoleon)': 'Professional studio photograph of a purebred Minuet Napoleon cat, flat Persian-type doll face combined with very short dwarf Munchkin legs, long or short plush coat, round large eyes, sweet doll-like expression, compact body on short legs, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Nebelung': 'Professional studio photograph of a purebred Nebelung cat, long-haired solid blue-gray coat with silver-tipped guard hairs creating shimmer effect, bright green eyes, elegant semi-foreign build, silky flowing coat, Russian Blue longhair type, sitting pose, neutral background, high resolution, detailed fur texture, award-winning cat photography',
          'Ojos Azules': 'Professional studio photograph of a purebred Ojos Azules cat, striking deep blue eyes as primary breed characteristic, any solid coat color or pattern except colorpoint, rare breed with unique blue eye gene unrelated to white or colorpoint, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Pixiebob': 'Professional studio photograph of a purebred Pixiebob cat, wild bobcat-like appearance with naturally bobbed short tail, brown spotted tabby coat, polydactyl large paws, lynx-like tufted ears, muscular build, wild feral expression, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Serengeti': 'Professional studio photograph of a purebred Serengeti cat, golden coat with distinct black spots like African Serval, very long legs, extremely large upright ears, lean athletic build, wild spotted pattern, Bengal-Serval appearance, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Thai Lilac': 'Professional studio photograph of a purebred Thai Lilac cat, solid pale lilac-gray color throughout, bright blue eyes, traditional Siamese body type and head shape, elegant foreign build, no points or patterns just solid lilac, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Sokoke': 'Professional studio photograph of a purebred Sokoke cat, distinctive wood-grain blotched tabby pattern unique to breed, African forest cat heritage, long athletic legs, large upright ears, brown agouti coat with wood-like markings, sitting pose, neutral background, high resolution, award-winning cat photography',
          'Ukrainian Levkoy': 'Professional studio photograph of a purebred Ukrainian Levkoy cat, completely hairless with distinctive folded ears that fold forward and down, wrinkled skin, angular wedge-shaped face, large prominent eyes, unique stepped ear fold profile, sitting pose, neutral background, high resolution, award-winning cat photography'
        };
        
        imagePrompt = catBreedSpecificPrompts[breedName] || `Professional studio photograph of a purebred ${breedName} cat, show quality feline, perfect conformation, sitting pose, neutral background, high resolution, detailed fur texture, award-winning cat photography`;
      } else {
        // Create breed-specific prompts for dogs with unique characteristics
        const breedSpecificPrompts = {
          'Sloughi': 'Professional studio photograph of a purebred Sloughi dog, North African sighthound, lean elegant build, smooth short coat, fawn or sandy colored, tall leggy appearance, sitting pose, neutral background, high resolution, award-winning dog photography',
          'Pyrenean Shepherd': 'Professional studio photograph of a purebred Pyrenean Shepherd dog, small to medium French herding dog, long wavy rough coat, energetic expression, triangular ears, sitting pose, neutral background, high resolution, detailed fur texture, award-winning dog photography',
          'Komondor': 'Professional studio photograph of a purebred Komondor dog, large Hungarian livestock guardian, distinctive white corded coat like dreadlocks, massive build, sitting pose, neutral background, high resolution, detailed corded fur texture, award-winning dog photography',
          'Cao de Serra de Aires': 'Professional studio photograph of a purebred Cao de Serra de Aires dog, Portuguese herding dog, medium size, long wavy coat, bearded face, rustic appearance, sitting pose, neutral background, high resolution, detailed fur texture, award-winning dog photography',
          'Azawakh': 'Professional studio photograph of a purebred Azawakh dog, West African sighthound, elegant lean build, short smooth coat, fawn or red colored with white markings, very tall leggy appearance, sitting pose, neutral background, high resolution, award-winning dog photography'
        };
        
        imagePrompt = breedSpecificPrompts[breedName] || `Professional studio photograph of a purebred ${breedName} dog, show quality canine, perfect conformation, sitting pose, neutral background, high resolution, detailed fur texture, award-winning dog photography`;
      }
    }

    console.log(`Generating image for: ${imagePrompt}`);

    // Use Runware API
    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          taskType: "authentication",
          apiKey: RUNWARE_API_KEY
        },
        {
          taskType: "imageInference",
          taskUUID: crypto.randomUUID(),
          positivePrompt: imagePrompt,
          width: 1024,
          height: 1024,
          model: "runware:100@1",
          numberResults: 1,
          outputFormat: "WEBP",
          CFGScale: 1,
          scheduler: "FlowMatchEulerDiscreteScheduler",
          strength: 0.8
        }
      ]),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Runware API error:', errorData);
      throw new Error(`Runware API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('Image generated successfully:', data);

    // Extract image URL from Runware response format
    const imageResult = data.data?.find((item: any) => item.taskType === "imageInference");
    const imageUrl = imageResult?.imageURL;
    
    if (!imageUrl) {
      console.error('No image URL in response:', data);
      throw new Error('No image URL received from Runware API');
    }

    return new Response(JSON.stringify({ 
      imageUrl: imageUrl,
      prompt: imagePrompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in image generation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate image' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
