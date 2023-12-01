const fs = require('fs');
const { v4: makeMeANewUUID } = require('uuid');

const PETS_FILE_PATH = "./data/pets.json";

const pets = JSON.parse(fs.readFileSync(PETS_FILE_PATH));

const operation = process.argv[2];

if (!operation) {
    console.log(pets);
    
    return;
} else if (operation === "findByName") {
    const petName = process.argv[3];
    
    const foundPet = pets.find((pet) => {
        return pet.name === petName;
    })
    
    if (foundPet) {
        console.log(foundPet);
    } else {
        console.log('\x1b[36m',{
            error: {
                message: "Unable to find pet with that name",
                statusCode: 404
            }
        }, '\x1b[0m');
    }
} else if (operation === "findBySpecies") {
    const petSpecies = process.argv[3];

    if (!petSpecies) {
        console.log({
            error: {
                message: "Species is required",
                statusCode: 400 // bad client
            }
        });

        return;
    }
    
    const foundPetsBySpecies = pets.filter((pet) => {
        return pet.species.toLowerCase() === petSpecies.toLowerCase();
    })

    console.log(foundPetsBySpecies);
} else if (operation === "removeById") {
    const petId = Number(process.argv[3]); // 7

    const newPets = pets.filter((pet) => {
        return pet.id !== petId
    });
    
    writeToFile(newPets);
} else if (operation === "addPet") {
    const name = process.argv[3];
    const species = process.argv[4];

    // pretend there's validation here
    const newPet = {
        id: makeMeANewUUID(),
        name: name,
        species: species
    }

    console.log(newPet);

    // newPet do what?
    pets.push(newPet);
    
    writeToFile(pets);
}


function writeToFile(pets) {
    fs.writeFileSync(PETS_FILE_PATH, JSON.stringify(pets));
}