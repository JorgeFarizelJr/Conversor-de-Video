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
        // Carregar o vídeo da URL
        loadVideoFromUrl(videoUrl);
    }
});

document.getElementById("file-upload").addEventListener("change", function() {
    // Lógica para lidar com a seleção de arquivo
    const fileInput = document.getElementById("file-upload");
    const videoFile = fileInput.files[0];
    if (videoFile) {
        console.log("Arquivo selecionado:", videoFile.name);
        // Carregar o vídeo selecionado, se necessário
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
    // Definir a fonte do vídeo para a URL fornecida
    const originalVideo = document.getElementById("original-video");
    originalVideo.src = videoUrl;
    document.getElementById("video-container").style.display = "block";
}

document.getElementById("convert-button").addEventListener("click", function() {
    // Lógica para converter o vídeo
    // Exemplo: Simulando uma conversão com um tempo de espera de 3 segundos
    setTimeout(function() {
        console.log("Vídeo convertido!");
        // Exibir ou fazer o download do vídeo convertido, conforme necessário
    }, 3000);
});
