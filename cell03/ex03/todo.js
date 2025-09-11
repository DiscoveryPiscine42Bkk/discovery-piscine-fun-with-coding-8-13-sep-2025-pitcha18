function setcookie(cid, cvalue){
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1); // expire +1 year
    document.cookie = cid + "=" + encodeURIComponent(cvalue) + "; expires=" + date.toUTCString() + "; path=/";
}

function deletelist(cid){
    document.cookie = cid + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

function addTask(){
    let data = prompt("Enter a new task:");
    let id = Date.now();
    if (data !== '' && data !== null){
        addList(data, id);
        setcookie(id, data);
    }
}

function addList(value, id = 'None'){
    let list = document.getElementById('ft_list');
    let div = document.createElement('div');
    div.textContent = value;
    div.id = id;

    list.prepend(div);

    div.onclick = function(){
        if (confirm(`Do you really want to delete: "${this.innerText}" ?`)){
            deletelist(this.id);
            this.remove();
        }
    };
}

function checkList(){
    let cookies = document.cookie.split(";");
    if (cookies.length > 0 && cookies[0] !== ""){
        for(let i = 0; i < cookies.length; i++){
            let part_cookie = cookies[i].split("=");
            if (part_cookie.length === 2){
                let key = part_cookie[0].trim();
                let value = decodeURIComponent(part_cookie[1]);
                addList(value, key);
            }
        }
    }
}
