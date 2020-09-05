export const FAMOUS_TEXTS = [
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec nam aliquam sem et tortor consequat id. Magna eget est lorem ipsum dolor sit amet consectetur. Eu consequat ac felis donec. Fermentum posuere urna nec tincidunt praesent semper feugiat. Tempor id eu nisl nunc. Risus pretium quam vulputate dignissim suspendisse. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Ultrices sagittis orci a scelerisque. Et ligula ullamcorper malesuada proin libero nunc consequat. Sed lectus vestibulum mattis ullamcorper velit. Elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet est placerat in egestas erat imperdiet sed euismod. Non tellus orci ac auctor augue mauris augue. Neque egestas congue quisque egestas diam in arcu cursus euismod. Enim tortor at auctor urna nunc id cursus metus aliquam. Suspendisse in est ante in nibh. Amet tellus cras adipiscing enim eu turpis egestas."
]


//async
// export function loadText() {
//     const xhttp = new XMLHttpRequest();
//     let url = 'http://newsapi.org/v2/everything?' +
//     'q=Education&' +
//     'from=2020-09-04&' +
//     'sortBy=popularity&' +
//     'apiKey=852943ed8eba4a2087c4646701dbf867';

//     xhttp.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200) {
//             const res = xhttp.response;
//             const resJSON = JSON.parse(res);
//             console.log(res);
//             document.getElementById('text').innerText = resJSON.articles[1].content;
//         }
//     }
//     xhttp.open('GET', url, true);
//     xhttp.send();
// }

//sync
export function loadText() {
    const xhttp = new XMLHttpRequest();
    let url = 'http://newsapi.org/v2/everything?' +
    'q=Education&' +
    'from=2020-09-04&' +
    'sortBy=popularity&' +
    'apiKey=852943ed8eba4a2087c4646701dbf867';


    xhttp.open('GET', url, false);
    xhttp.send(null);

    if (xhttp.status === 200) {


        const res = xhttp.response;
        const contentURL = JSON.parse(res).articles[0].url;
        const reqURL = `https://extractorapi.com/api/v1/extractor/?apikey=1b869ada395aeb457834feae67663cbc23670d9a&url=${contentURL}`
        const xhttpContentReq = new XMLHttpRequest();

        xhttpContentReq.open('GET',reqURL, false);
        xhttpContentReq.send(null);
        // console.log(xhttpContentReq.status);
        if (xhttpContentReq.status === 200) {
            // console.log(JSON.parse(xhttpContentReq.response).text);
            const contentRes = JSON.parse(xhttpContentReq.response).text;
            document.getElementById('text').innerText = contentRes;
        }
    }
}

// export let req = new Request(url);

// export const content = fetch(req)
//     .then((response) => response.json())
//     .then(data => console.log(data));