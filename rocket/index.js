document.addEventListener("DOMContentLoaded", (event)  => {

    (function () {
            // let str = TrustNo1;

        const inputPassword = document.getElementById("password");
        const submitBtn = document.querySelector(".submit-btn");
        const inputs = document.querySelectorAll("input");
        const launchBtn = document.querySelector(".launch-btn");
        const inputRange = document.getElementById("input-range");
        const inputsCheckBox = document.querySelectorAll(".input-checkbox");
        const rocket = document.querySelector(".rocket");
        let chosenTrajectory;

        const definitionOfTTrajectory = () => {
            inputRange.addEventListener("change", () => {
                chosenTrajectory = `rotate(${inputRange.value}deg)`;
                rocket.style.transform = `rotate(${inputRange.value}deg)`
            })
        }

        definitionOfTTrajectory();

        const definitionOfSpeed = () => {
            let speed = 0;
            inputsCheckBox.forEach(el => {
                if (el.checked) {
                    speed++
                }
            });

            return speed;
        }

        submitBtn.addEventListener("click", () => {
            removeAttrDisabled();
            inputPassword.setAttribute("disabled", "disabled");
            submitBtn.setAttribute("disabled", "disabled");
        })

        inputPassword.addEventListener("keydown", (e) => {
            if(e.key === 'Enter') {
                e.preventDefault();
                removeAttrDisabled();
                inputPassword.setAttribute("disabled", "disabled");
                submitBtn.setAttribute("disabled", "disabled");
            }
        })

        const removeAttrDisabled = () => {
            if (typeof (parseInt(inputPassword.value)) === "number") {
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].removeAttribute("disabled");
                }
            }
        }

        launchBtn.addEventListener("click", () => {

            if (!launchBtn.hasAttribute("disabled")) {
                let progress = 0;
                let k = definitionOfSpeed();

                let wh = document.body.clientHeight;
                const launchRocket = () => {
                    progress += k;

                    if(chosenTrajectory) {
                        rocket.style.transform = `${chosenTrajectory} translateY(-${progress}px`;
                    } else {
                        rocket.style.transform = `rotate(29deg) translateY(-${progress}px`;
                    }

                    if (progress < wh + 200) {
                        requestAnimationFrame(launchRocket);
                    }
                }
                window.requestAnimationFrame(launchRocket);
            }
        })
    }())
});