(function() {
    const textarea = document.getElementById("textarea");
    const upperCase = document.getElementById("upper-case");
    const lowerCase = document.getElementById("lower-case");
    const properCase = document.getElementById("proper-case");
    const sentenceCase = document.getElementById("sentence-case");
    const saveButton = document.getElementById("save-text-file");

    upperCase.addEventListener("click", () => {
        textarea.value = textarea.value.toUpperCase();
    })

    lowerCase.addEventListener("click", () => {
        textarea.value = textarea.value.toLowerCase();
    })

    properCase.addEventListener("click", () => {
        textarea.value = textarea.value.toLowerCase().split(" ").reduce((acc, el) => {
            acc.push(el.substr(0, 1).toUpperCase() + el.slice(1));
            return acc;
        }, []).join(" ");

    })

    sentenceCase.addEventListener("click", () => {
        let regex = /\. [a-zа-я]/g;

        let result = textarea.value.charAt(0).toUpperCase() +
            textarea.value.substr(1, textarea.value.length).toLowerCase();
        + textarea.value.slice(1);

        textarea.value = result.replace(regex, function (letter) {
            return letter.toUpperCase();
        });


        // const file = new File([textarea.value], 'hello.txt');
        // saveButton.href =  URL.createObjectURL(file)

        function download(filename, text) {
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        saveButton.addEventListener("click", () => {
            download("text.txt", textarea.value);
        })
    })
}());