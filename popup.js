window.onload = function () {
    var video = document.getElementById('monitor');
    var canvas = document.getElementById('photo');
    var setinterval;

    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function (stream) {
        video.srcObject = stream;
        video.onloadedmetadata = function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };
    }).catch(function (reason) {
        document.getElementById('errorMessage').textContent = 'No camera available.';
    });

    if (document.getElementById("newtab").checked) {
        clearInterval(setinterval);
        chrome.tabs.onCreated.addListener(function () {
            canvas.getContext('2d').drawImage(video, 0, 0);
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            document.getElementById("photos").appendChild(image);
            var node = document.createElement("p");
            var textnode = document.createTextNode(Date().toString());
            node.appendChild(textnode);
            document.getElementById("photos").appendChild(node);
        });
    }

    document.getElementById("newtab").addEventListener("change", function () {
        if (document.getElementById("newtab").checked) {
            clearInterval(setinterval);
            chrome.tabs.onCreated.addListener(function () {
                canvas.getContext('2d').drawImage(video, 0, 0);
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                document.getElementById("photos").appendChild(image);
                var node = document.createElement("p");
                var textnode = document.createTextNode(Date().toString());
                node.appendChild(textnode);
                document.getElementById("photos").appendChild(node);
            });
        }
    });

    document.getElementById("timeform").addEventListener("submit", function (e) {
        e.preventDefault();
        let timeinterval = document.getElementById("timetextbox").value * 1000;
        setinterval = setInterval(function () {
            canvas.getContext('2d').drawImage(video, 0, 0);
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            document.getElementById("photos").appendChild(image);
            var node = document.createElement("p");
            var textnode = document.createTextNode(Date().toString());
            node.appendChild(textnode);
            document.getElementById("photos").appendChild(node);
        }, timeinterval);
    });

    document.getElementById("title").addEventListener("click", function () {
        if (document.getElementById("container").style.visibility === "hidden") {
            document.getElementById("optionform").style.visibility = "visible";
            document.getElementById("container").style.visibility = "visible";
            document.getElementById("title").innerHTML = "Blank Page?";
        } else {
            document.getElementById("container").style.visibility = "hidden";
            document.getElementById("optionform").style.visibility = "hidden";
            document.getElementById("timetextbox").style.visibility = "hidden";
            document.getElementById("newtab").checked = true;
            document.getElementById("title").innerHTML = "Blank Page";
        }
    });

    document.getElementById("setinterval").addEventListener("click", function () {
        if (document.getElementById("setinterval").checked) {
            document.getElementById("timetextbox").style.visibility = "visible";
        }
    });

    document.getElementById("newtab").addEventListener("click", function () {
        if (document.getElementById("newtab").checked) {
            document.getElementById("timetextbox").style.visibility = "hidden";
        }
    });
};