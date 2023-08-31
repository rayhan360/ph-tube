const manageCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const phTube = data.data;
    // console.log(tube);

    const categoryContainer = document.getElementById('tab-container');

    phTube.forEach((category) => {
        const createDiv  = document.createElement('div');
        createDiv.innerHTML = `
        <a class="tab bg-gray-300 text-gray-600 rounded-lg">${category.category}</a>
        `;
        categoryContainer.appendChild(createDiv)
    });
    
}

manageCategory()