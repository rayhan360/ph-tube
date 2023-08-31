const manageCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const phTube = data.data;
    // console.log(tube);

    const categoryContainer = document.getElementById('tab-container');

    phTube.forEach((category) => {
        const createDiv  = document.createElement('div');
        createDiv.innerHTML = `
        <a onclick="manageData('${category.category_id}')" class="tab bg-gray-300 text-gray-600 rounded-lg">${category.category}</a>
        `;
        categoryContainer.appendChild(createDiv)
    });
    
};

const manageData = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const videos = data.data;
    // console.log(videos);

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // no found
    const noData = document.getElementById('no-found-data');
    if(videos.length === 0){
        noData.classList.remove('hidden')
    }else{
        noData.classList.add('hidden')
    }

    videos.forEach((video) => {
        // console.log(video);
        const div = document.createElement('div');
        const check = true;
        const img = `<img src="image/svg.svg"/>`
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
        <figure><img class="w-[300px] h-[200px]" src=${video?.thumbnail}, alt="thumbnail image" /></figure>
        <div class="card-body">
            <div class="flex gap-3">
                <div class="">
                    <img class="rounded-full w-10 h-10" src=${video?.authors[0]?.profile_picture} alt="">
                </div>
                <div>
                    <h1 class="text-black text-lg font-medium">${video?.title}</h1>
                    <div class="flex gap-5 mt-2">
                        <h1 class="text-sm">${video.authors[0].profile_name}</h1>
                        <p>${video.authors[0].verified === check ? img : ''}</p>
                    </div>
                    <p class="text-sm mt-2">${video.others.views} views</p>
                </div>
            </div>
        </div>
        <p class="absolute top-52 left-72 md:absolute md:top-44 md:left-64 lg:absolute lg:top-40 lg:left-56 text-sm bg-[#171717] w-30 text-white rounded-md py-1 px-1 "></p>
    </div>
        `;
    cardContainer.appendChild(div)

    })

    
}


manageCategory()
manageData("1000")