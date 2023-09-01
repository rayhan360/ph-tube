const manageCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const phTube = data.data;
    // console.log(tube);

    const categoryContainer = document.getElementById('tab-container');

    phTube.forEach((category) => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <a id="category-btn" onclick="manageData('${category.category_id}')" class="tab bg-gray-300 text-gray-600 rounded-lg">${category.category}</a>
        `;
        categoryContainer.appendChild(createDiv)
    });
};

const sortData = () => {
    const cardContainer = document.getElementById('card-container');
    const cards = Array.from(cardContainer.children);

    const sortedCardData = cards.sort((card1, card2) => {
        const views1 = parseInt(card1.querySelector('#total-views').innerText.split("K", 1));
        const views2 = parseInt(card2.querySelector('#total-views').innerText.split("K", 1))
        return views2 - views1
    });

    cardContainer.innerHTML = '';

    sortedCardData.forEach(card => {
        cardContainer.appendChild(card)
    });
}



const manageData = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const videos = data.data;
    // console.log(videos);

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // no found
    const noData = document.getElementById('no-found-data');
    if (videos.length === 0) {
        noData.classList.remove('hidden')
    } else {
        noData.classList.add('hidden')
    }


    videos.forEach((video) => {
        // console.log(video);
        const div = document.createElement('div');

        const convertSecondToHrsMin = (second) => {
            const hours = Math.floor(second / 3600);
            const remainSec = Math.floor(second % 3600);
            const min = Math.floor(remainSec / 60);

            return { hours, min }
        }
        const totalSeconds = video.others.posted_date;
        const { hours, min } = convertSecondToHrsMin(totalSeconds);

        const check = true;
        const img = `<img src="image/svg.svg"/>`
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <div class="relative">
                <figure><img class="w-[300px] h-[200px]" src=${video?.thumbnail}, alt="thumbnail image" /></figure>
                <div class=" text-white text-sm rounded-md p-1 absolute right-16 md:absolute md:right-12 md:bottom-2 bottom-2 lg:absolute lg:right-6 lg:bottom-2 ${hours === 0 ? '' : 'bg-black'}">
                    <p>${hours === 0 ? '' : hours} ${hours === 0 ? '' : 'hrs'} ${min === 0 ? '' : min} ${min === 0 ? '' : 'min'} ${hours === 0 ? '' : 'ago'}</p>
                </div>
            </div>
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
                        <p id="total-views" class="text-sm mt-2">${video.others.views} views</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(div)

    })


}


manageCategory()
manageData("1000")