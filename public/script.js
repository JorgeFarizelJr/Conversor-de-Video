document.getElementById("upload-button").addEventListener("click", function() {
    document.getElementById("file-upload").click();
});

document.getElementById("url-button").addEventListener("click", function() {
    document.getElementById("video-url").style.display = "block";
    document.getElementById("video-url").focus(); // Focus no campo de URL
});

document.getElementById("video-url").addEventListener("input", function() {
    const videoUrl = this.value;
    if (videoUrl) {
        loadVideoFromUrl(videoUrl);
    }
});

document.getElementById("file-upload").addEventListener("change", function() {
    const videoFile = this.files[0];
    if (videoFile) {
        loadOriginalVideo(videoFile);
    } else {
        console.log("Nenhum arquivo selecionado.");
    }
});

function loadOriginalVideo(videoFile) {
    const originalVideo = document.getElementById("original-video");
    originalVideo.src = URL.createObjectURL(videoFile);
    document.getElementById("video-container").style.display = "block";
}

function loadVideoFromUrl(videoUrl) {
    const originalVideo = document.getElementById("original-video");
    originalVideo.src = videoUrl;
    document.getElementById("video-container").style.display = "block";
}

document.getElementById("convert-button").addEventListener("click", function() {
    const videoFile = document.getElementById("file-upload").files[0];
    if (!videoFile) {
        alert("Por favor, selecione um vídeo primeiro.");
        return;
    }
    
    const formData = new FormData();
    formData.append("video", videoFile);

    fetch("/videos/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        fetch("/videos/convert", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputFile: videoFile.name })
        })
        .then(response => response.json())
        .then(data => {
            if (data.outputFile) {
                const downloadLink = document.getElementById("download-link");
                downloadLink.href = `/videos/download/${data.outputFile}`;
                downloadLink.style.display = "block";
            }
        })
        .catch(error => console.error('Erro ao converter o vídeo:', error));
    })
    .catch(error => console.error('Erro ao fazer upload do vídeo:', error));
});
