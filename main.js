// ============= VARIALBLES:
let drawer = document.querySelector('.openDrawer');
let main = document.querySelector('.main');
let drawerLayout = document.querySelector('.drawer');
let close = document.querySelector('.close');
let mode = document.querySelector('.mode');
let a = document.querySelectorAll('.a');
let title = document.querySelectorAll('.title');
let black = document.querySelectorAll('.black');
let searchLayout = document.querySelector('.search');
let search = document.querySelector('.searchIcon');



// ============= CUSTOM-FUNCTIONS:
function createCell(title = 'Loading...', content = 'Loading...', date = 'Loading...', time = 'Loading...') {
  let cell = `<span class="cell"><span class="title">${title}</span><span class="content">${content}.</span><span class="details"><span class="block"><ion-icon name="calendar-clear-outline" class="small"></ion-icon><span class="date">${date}</span></span><span class="block"><ion-icon name="time-outline" class="small"></ion-icon><span class="time">${time}</span></span></span></span>`;
  let list = document.querySelector('.list');
  list.innerHTML += cell;
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}




// ============= PRE-CHECKS:
if (getCookie("dark") == 'true') {
  title.forEach((element) => {
    element.style.color = '#515FFF';
  })
  a.forEach((element) => {
    element.classList.toggle('dark-mode');
    drawerLayout.style.borderRight = "2px solid #FFFFFF";
  });
}




// ============= EVENT-LISTEMERS:
search.addEventListener('click', () => {
  if (!search.classList.contains('active')) {
    search.classList.toggle('active', true);
    searchLayout.style.top = '5em';
  } else {
    searchLayout.style.top = '-5em';
    search.classList.remove('active');
  }
})
mode.addEventListener('click', () => {
  if (!mode.classList.contains('dark-mode')) {
    title.forEach((element) => {
      element.style.color = '#515FFF';
    })

    a.forEach((element) => {
      element.classList.toggle('dark-mode');
      drawerLayout.style.borderRight = "2px solid #FFFFFF";
    })
    setCookie("dark", "true", "1000");
  } else {
    title.forEach((element) => {
      element.style.color = '#FFFFFF';
    })

    a.forEach((element) => {
      element.classList.toggle('dark-mode', false);
    })
    setCookie("dark", "false", "1000");
  }
})

drawer.addEventListener('click', () => {
  drawerLayout.style.left = "-10px";
  main.style.backgroundColor = "rgba(0,0,0,.3";
});

close.addEventListener('click', () => {
  drawerLayout.style.left = "-320px";
  main.style.backgroundColor = "#FFFFFF"
  main.style.filter = "";
});




// ============= MISCELLANEOUS

for(let i=0;i<=10; i++) {
  let http = new XMLHttpRequest();
http.open('GET', 'https://api.quotable.io/random');
http.addEventListener('load', () => {
  if (http.readyState == 4 && http.status == 200) {
    let response = JSON.parse(http.responseText);
    createCell(response.author, response.content, response.dateAdded, response.length + 'words');
  } else {
    console.error('UNDEFINED');
  }
});

  http.send();
}
