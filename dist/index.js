"use strict";
const getUserName = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main_container");
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not Ok-status:${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
const showResultUI = (singleUser) => {
    const { login, avatar_url, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class='card'> 
        <img src=${avatar_url} alt=${login} />
        <hr />
        <div class="card-footer">
            <img src="${avatar_url}" alt="${login}" /> 
            <a href="${url}"> Github </a>
        </div>
    </div>
    `);
};
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
            // console.log('Login '+ singleUser.login);
        }
    });
}
fetchUserData("https://api.github.com/users");
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    let searchTerm = getUserName.value.toLowerCase();
    try {
        const url = 'https://api.github.com/users';
        const allUserData = await myCustomFetcher(url, {});
        const matchingUser = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = "";
        if (matchingUser.length === 0) {
            main_container.insertAdjacentHTML("beforeend", `<p class='empty-msg'>No matching users found</p>
            `);
        }
        else {
            for (const singleUser of matchingUser) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
