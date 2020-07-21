let pause = document.querySelector('#pause_video');
let iframe_tag = [];

function findVideos() {
    let videos = document.querySelectorAll('.video__item');

    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {
    let link = video.querySelector('.video__item_link');
    let media = video.querySelector('.video__cover');
    let button = video.querySelector('.video__button');
    let id = parseMediaUrl(media);

    video.addEventListener('click', () => {
        // console.log('КЛИК ИВЕНТ', evt.view.length);
        
        let iframe = createIframe(id);
        iframe_tag.push(iframe);
        
        if (iframe_tag.length > 1) {            
            for (let i = 0; i < iframe_tag.length-1; i++) {
                iframe_tag[i].contentWindow.postMessage('{"event": "command", "func": "pauseVideo", "args": ""}', "*");
            }
        }

        link.remove();
        button.remove();
        video.appendChild(iframe);
    })

    link.removeAttribute('href');
    video.classList.add('video__enabled');
}

function parseMediaUrl(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
}

function createIframe(id) {

    let iframe = document.createElement('iframe');

    iframe.setAttribute('src', generateURL(id));
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.classList.add('video__cover');

    return iframe;
}

function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1&modestbranding=1&enablejsapi=1';

    return 'https://www.youtube.com/embed/' + id + query;
}


findVideos();