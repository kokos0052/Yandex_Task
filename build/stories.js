function renderTemplate(alias, data) {
    if (alias === 'leaders') {
        const titleText = data.data.title;
        const subtitleText = data.data.subtitle;
        const users = data.data.users;

        let usersEl = `<div class="users">`;
        let usersArr = [];

        users.forEach((user, index) => {
            let incIndex = index + 1;
            userEl = `
                <div id="${user.id}" class="user ${index == 3 || index == 4 ? "small" : ''}">
                    <div class="user__info">
                        <img ${index == 0 ? 'class="crown"' : ''}${index + 1 == users.length ? 'class="like"' : '' } src="./build/img/${user.avatar}"/>
                        <p class="user__name">${user.name}</p>
                        <p class="user__value">${user.valueText}</p>
                    </div>
                    <div class="step ${index == 0 ? "big" : ''}${index == 1 || index == 2 ? "medium" : ''}${index == 3 || index == 4 ? "small" : ''}">${incIndex}</div>
                </div>
            `
            console.log(user.avatar);
            if (incIndex % 2 != 0) {
                usersArr.unshift({
                    userEl,
                    incIndex
                });
            }

            if (incIndex % 2 == 0) {
                usersArr.push({
                    userEl,
                    incIndex
                });
            }
        });


        usersArr.forEach(elem => {
            usersEl = usersEl + elem.userEl;
        });

        usersEl = usersEl + '</div>'

        leadersEl = `
        <div class="leaders">
            <div class="title">
                <p class="title-text">${titleText}</p>
                <p class="subtitle">${subtitleText}</p>
            </div>
            ${usersEl}
        </div>
        `

        return `${leadersEl}`;
    }

    if (alias === 'vote') {
        const titleText = data.data.title;
        const subtitleText = data.data.subtitle;
        const selectedUser = data.data.selectedUserId;
        const users = data.data.users;

        let usersArrLeft = [];
        let usersArrRight = [];

        let userLeftContainer = [];
        let userRightContainer = [];

        let currSlide = 0;

        function renderVote() {
            users.forEach((user, index) => {
                const userEl = `
                    <div id="${user.id}"class="vote__user ${user.id === selectedUser ? 'vote__top-user' : '' } ${(index + 1) % 6 == 2 ? 'center__left_user' : ''}${(index + 1) % 6 == 5 ? 'center__right_user' : ''}">
                        <img class="vote__user-img" src="./build/img/${user.avatar}" />
                        <div class="vote__user-name">${user.name}</div>
                    </div>
                `



                if (((index + 1) % 6 < 3 || (index + 1) % 6 === 5) && (index + 1) % 6 !== 0) {
                    userLeftContainer.push(userEl);
                } else {
                    userRightContainer.push(userEl);
                }

                if (userLeftContainer.length === 3) {
                    usersArrLeft.push(userLeftContainer);
                    userLeftContainer = [];
                }

                if (userRightContainer.length === 3) {
                    usersArrRight.push(userRightContainer);
                    userRightContainer = [];
                }
            });

            const voteEl = `
                <div class="title">
                    <p class="title-text">${titleText}</p>
                    <p class="subtitle">${subtitleText}</p>
                </div>
                <div class="vote__slider">
                    <div class="vote__users_left">
                        ${renderLeftUsers()}
                    </div>
                    <div class="vote__buttons">
                        <buttons class="vote__prev_button ${currSlide == 0 ? 'disabled__button' : ''}"></buttons>
                        <buttons class="vote__next_button ${currSlide == (userLeftContainer.length - 1) ? 'disabled__button' : ''}"></buttons>
                    </div>
                    <div class="vote__users_right">
                        ${renderRightUsers()}
                    </div>
                </div>
            `

            function renderLeftUsers() {
                let res = '';
                usersArrLeft[currSlide].forEach(elem => res += elem);
                return res;
            }


            function renderRightUsers() {
                res = '';
                usersArrRight[currSlide].forEach(elem => res += elem);
                return res;
            }

            return voteEl;
        }

        document.addEventListener("DOMContentLoaded", () => {
            const prevButton = document.querySelector('.vote__prev_button');
            const nextButton = document.querySelector('.vote__next_button');
            const leftUsers = document.querySelector('.vote__users_left');
            const rightUsers = document.querySelector('.vote__users_right');
            

            let users = document.querySelectorAll('.vote__user');
            let currUser = 0;
            

            function renderLeftUsers() {
                let res = '';
                usersArrLeft[currSlide].forEach(elem => res += elem);
                return res;
            }

            function renderRightUsers() {
                res = '';
                usersArrRight[currSlide].forEach(elem => res += elem);
                return res;
            }

            prevButton.addEventListener('click', () => {
                if (currSlide > 0) {
                    currSlide -= 1;
                    console.log(currSlide);
                }

                nextButton.classList.remove('disabled__button');

                if (currSlide - 1 === 0 || currSlide == 0) {
                    prevButton.classList.add('disabled__button');
                }

                if ( leftUsers != renderLeftUsers() && rightUsers != renderRightUsers() ) {
                    leftUsers.innerHTML = renderLeftUsers();
                    rightUsers.innerHTML = renderRightUsers();
                    users = document.querySelectorAll('.vote__user');
                    users.forEach((user, index) => user.addEventListener('click', () => {
                        users[currUser].classList.remove('selected-user')
                        user.classList.add('selected-user');
                        currUser = index;
                    })
                );
                }
            });

            nextButton.addEventListener('click', () => {
                if (currSlide < (usersArrLeft.length - 1)) {
                    currSlide += 1;
                    console.log(currSlide);
                }

                prevButton.classList.remove('disabled__button');

                if (currSlide + 1 === usersArrLeft.length - 1 || currSlide === usersArrLeft.length - 1) {
                    nextButton.classList.add('disabled__button');
                }

                if ( leftUsers != renderLeftUsers() && rightUsers != renderRightUsers() ) {
                    leftUsers.innerHTML = renderLeftUsers();
                    rightUsers.innerHTML = renderRightUsers();
                    users = document.querySelectorAll('.vote__user');
                    users.forEach((user, index) => user.addEventListener('click', () => {
                        users[currUser].classList.remove('selected-user')
                        user.classList.add('selected-user');
                        currUser = index;
                    })
                );
                }
            });

            users.forEach((user, index) => user.addEventListener('click', () => {
                    users[currUser].classList.remove('selected-user');
                    user.classList.add('selected-user');
                    currUser = index;
                })
            );

        })

        return renderVote();

    }

    if (alias === 'chart') {
        const titleText = data.data.title;
        const subtitleText = data.data.subtitle;
        const values = data.data.values;
        const users = data.data.users;


        let colsEl = ``
        let valuesArr = [];

        values.forEach((col) => {
            let colEl = ``;
            colEl = `
                <div class="chart__col-container ${col.active ? 'chart__col-container--active' : ''}">    
                    <div class="chart__col-value">
                        ${col.value}
                    </div>
                    <div class="char__col ${col.active ? 'active__col' : ''}"></div>
                    <div class="char__col-title">
                        ${col.title}
                    </div>
                </div>
            `;
            if ( parseInt(col.title) > 206 && parseInt(col.title) < 216 ) {
                colsEl += colEl;
                valuesArr.push(col.value); 
            }

        });

        document.addEventListener("DOMContentLoaded", () => {
            const cols = document.querySelectorAll('.char__col');
            console.log(valuesArr);

            console.log(cols);
            cols.forEach((col, index) => {
                if ( valuesArr[index] > 0 ) {
                    col.style.height = `${valuesArr[index] * 2.5}px`;
                } else {
                    col.style.height = '10px';
                }
            });


        });

        let usersEl = ``;
        users.forEach((user) => {
            const userEl = `
                <div class="user__container" id="${user.id}">
                    <img class="user__img" src="./build/img/${user.avatar}">
                    <div class="user__info">
                        <p class="user__name">
                            ${user.name}
                        </p>
                        <p class="user__value">
                            ${user.valueText}
                        </p>
                    </div>
                </div>
            `

            usersEl += userEl;
        });

        const chartEl = `
            <div class="title">
                <p class="title-text">${titleText}</p>
                <p class="subtitle">${subtitleText}</p>
            </div>
            <div class="chart__cols">
                <div class="chart__cols-container">
                    ${colsEl}
                </div>    
            </div>
            <div class="chart__users">
                ${usersEl}
            </div>
        `

        return chartEl;
    }

    if (alias === 'diagram') {

        const titleText = data.data.title;
        const subtitleText = data.data.subtitle;
        const totalText = data.data.totalText;
        const differenceText = data.data.differenceText;
        const categories = data.data.categories;

        let diagEl = ``;
        let textEl = ``;

        categories.forEach((category) => {
        });

        diagEl = `
            <svg width="50%" height="50%" viewBox="0 0 50 50" class="diagram">
            <radialGradient id="dark-Theme_gradient-1" cx="0.5" cy="0.5" r="0.6">
                <stop offset="71.88%" stop-color="rgba(255, 163, 0, 0.8)"/>
                <stop offset="100%" stop-color="rgba(91, 58, 0, 0.8)"/>
            </radialGradient>
            <radialGradient id="dark-Theme_gradient-2" cx="0.4" cy="0.4" r="0.5">
                <stop offset="72.92%" stop-color="rgba(99, 63, 0, 0.5)"/>
                <stop offset="100%" stop-color="rgba(5, 9, 0, 0.5)"/>
            </radialGradient>
            <radialGradient id="dark-Theme_gradient-3" cx="0.5" cy="0.5" r="0.6">
                <stop offset="71.88%" stop-color="rgba(155, 155, 155, 0.5)"/>
                <stop offset="100%" stop-color="rgba(56, 41, 0, 0.5)"/>
            </radialGradient>
            <radialGradient id="dark-Theme_gradient-4">
                <stop offset="71.88%" stop-color="rgba(77, 77, 77, 0.5)"/>
                <stop offset="100%" stop-color="rgba(56, 41, 0, 0.5)"/>
            </radialGradient>
            <radialGradient id="light-Theme_gradient-1">
                <stop offset="81.25%" stop-color="rgba(255, 184, 0, 0.56)"/>
                <stop offset="100%" stop-color="rgba(255, 239, 153, 0.32)"/>
            </radialGradient>
            <radialGradient id="light-Theme_gradient-2">
                <stop offset="81.25%" stop-color="rgba(255, 184, 0, 0.24)"/>
                <stop offset="100%" stop-color="rgba(255, 239, 153, 0.12)"/>
            </radialGradient>
            <radialGradient id="light-Theme_gradient-3">
                <stop offset="82.81%" stop-color="rgba(166, 166, 166, 0.1725)"/>
                <stop offset="100%" stop-color="rgba(203, 203, 203, 0.05)"/>
            </radialGradient>
            <radialGradient id="light-Theme_gradient-4">
                <stop offset="82.81%" stop-color="rgba(191, 191, 191, 0.345)"/>
                <stop offset="100%" stop-color="rgba(228, 228, 228, 0.1)"/>
            </radialGradient>
                <circle class="diagram-hole" cx="21" cy="21" r="15.91549430918954" fill="transparent"></circle>
                <circle class="diagram-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#fff" stroke-width="5"></circle>
                <circle class="diagram-segment orange-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke-width="5" stroke-dasharray="25 75" stroke-dashoffset="25"></circle>
                <circle class="diagram-segment brown-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke-width="5" stroke-dasharray="25 75" stroke-dashoffset="50"></circle>
                <circle class="diagram-segment grey-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke-width="5" stroke-dasharray="25 75" stroke-dashoffset="75"></circle>
                <circle class="diagram-segment black-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke-width="5" stroke-dasharray="25 75" stroke-dashoffset="0"></circle>
                <g>
                    <text x="50%" y="50%" class="diagram-total">
                        ${totalText}
                    </text>
                    <text x="50%" y="50%" class="diagram-difference">
                        ${differenceText}
                    </text>
                </g>
            </svg>
        `;

        const diagramEl = `
            <div class="title">
                <p class="title-text">${titleText}</p>
                <p class="subtitle">${subtitleText}</p>
            </div>
            <div class="diagram__container">
                <div class="diagram">
                    ${diagEl}
                </div>
                <div class="diagram__text">
                    ${textEl}
                </div>
            </div>
        `;

        return diagramEl;

    }

}