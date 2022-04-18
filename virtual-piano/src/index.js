document.addEventListener('DOMContentLoaded', () => {
    (function () {

        console.log('dkcxvhxk');
        const keys = document.querySelectorAll('.piano-key');

        const addingActiveEffect = (value) => {
            keys.forEach((el) => {
                if (el.textContent.toLowerCase() === value) {
                    el.classList.toggle("active-key");
                } else {
                    el.classList.remove("active-key");
                }
            })
        }

        const createAudio = (path) => {
            new Audio(`${path}`).play();

        }

        document.addEventListener('keydown', (e) => {
            addingActiveEffect(e.key);

            switch (e.key.toUpperCase()) {
                case "A":
                    createAudio("white_keys/A.mp3");
                    break;
                case "S":
                    createAudio("white_keys/S.mp3");

                    break;
                case "D":
                    createAudio("white_keys/D.mp3");

                    break;
                case "F":
                    createAudio("white_keys/F.mp3");

                    break;
                case "G":
                    createAudio("white_keys/G.mp3");
                    break;

                case "H":
                    createAudio("white_keys/H.mp3");
                    break;

                case "J":
                    createAudio("white_keys/J.mp3");
                    break;

                case "W":
                    createAudio("black_keys/W.mp3");
                    break;
                case "E":
                    createAudio("black_keys/E.mp3");
                    break;
                case "T":
                    createAudio("black_keys/T.mp3");
                    break;
                case "Y":
                    createAudio("black_keys/Y.mp3");
                    break;
                case "U":
                    createAudio("black_keys/U.mp3");
                    break;
            }
        })

    }())
})