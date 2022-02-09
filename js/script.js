const contactPerPage = 10;
const page = 1;

const showPage = (list, page) => {
    list = Array.from(list);

    let start = (page * contactPerPage) - contactPerPage;
    let end = start + contactPerPage;
    if (end > list.length) {
        end = list.length;
    }

    let pageList = list.slice(start, end);

    for(let i = 0; i < list.length; i++){
        if(!pageList.includes(list[i])) {
            list[i].style.display = "none";
        }
    }

    for(let i = 0; i < pageList.length; i++){
        pageList[i].style.display = "block";
    }
}


const appendPageLinks = list => {
    let numberOfPages = Math.ceil(list.length / contactPerPage);
    const wrapperDiv = document.getElementsByClassName("page")[0];
    const paginationDiv = document.createElement("div");
    paginationDiv.className = "pagination";
    wrapperDiv.appendChild(paginationDiv);
    const ul = document.createElement("ul");
    paginationDiv.appendChild(ul);

    for (let i = 1; i <= numberOfPages; i++){
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerHTML = i;
        a.addEventListener('click', event => {
            showPage(list, event.target.innerHTML);
            event.target.className = "active";
            let element = ul.querySelectorAll("a");
            for(let i = 0; i < element.length; i++) {
                if (element[i] !== event.target) {
                    element[i].className = "";
                }
            }
        });

        li.appendChild(a);
        ul.appendChild(li);
        ul.querySelector("li").children[0].className = "active";
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    let contacts = document.getElementsByClassName("contact-list")[0];
    for(let i = contactPerPage; i < contacts.children.length; i++){
        contacts.children[i].style.display = "none";
    }
    appendPageLinks(contacts.children);
})