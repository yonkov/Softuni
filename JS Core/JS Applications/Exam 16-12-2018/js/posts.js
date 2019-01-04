let pets = (() => {
    function getAllpets() {
        const endpoint = 'pets?query={}&sort={"likes": -1}';

        return remote.get('appdata', endpoint, 'kinvey');
    }
    
    function createpet(name, description, imageURL, category, likes) {
        let data = { name, description, imageURL, category, likes};

        return remote.post('appdata', 'pets', 'kinvey', data);
    }

    function editpet(petId, name, description, imageURL, category, likes) {
        const endpoint = `pets/${petId}`;
        let data = { name, description, imageURL, category, likes };

        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function addpet(likes) {
        const endpoint = `pets/${petId}`;
        let data = { likes };

        return remote.update('appdata', endpoint, 'kinvey', data);
    }
    
    function deletepet(petId) {
        const endpoint = `pets/${petId}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }
    
    function getMypets(userId){
        let endpoint = `pets?query={"_acl.creator":"${userId}"}`;
        return remote.get('appdata',endpoint, 'kinvey');
    }

    function getpetById(petId) {
        const endpoint = `pets/${petId}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {
        getAllpets,
        createpet,
        editpet,
        deletepet,
        getpetById,
        getMypets,
        addpet
    }
})();