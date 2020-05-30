// ---- keydown, keyup, keypress

//При загрузке документа
document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.querySelector('.gameboard'); //Стыкуем в переменную элемент
    const score = document.querySelector('.header__score'); //Стыкуем в переменную элемент

    const generateEgg = () => {                           //Генерируем позицию элемента 
        const xPos = Math.round(Math.random() * 800 + 200); // Случайным образом вычисляем положение по координате x
        const yPos = Math.round(Math.random() * 400 + 200); // Случайным образом вычисляем положение по координате y
        const eggMaxSize = 70;      //Максимальный размер для "цели"
        const eggMinSize = 30;      //Минимальный размер для "цели"
        const eggSize = Math.round(Math.random() * (eggMaxSize - eggMinSize) + eggMinSize); //вычисляем размер "цели"
        const availableColor = ['tomato', 'yellow', 'white', 'pink', 'salmon', 'lightblue', 'lightgreen']; //набор возможных цветов
        const fillColor = availableColor[Math.round(Math.random() * (availableColor.length - 1))]; //выбираем цвет
/*
        const eggSvg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            style="position: fixed; z-index: 2; left: ${xPos}px; top: ${yPos}px;"
             x="0px" y="0px"
            width="${eggSize}px" height="${eggSize}px" 
            viewBox="0 0 540.016 540.016" style="enable-background:new 0 0 540.016 540.016;"
            xml:space="preserve">
            <g>
            <path fill="${fillColor}" d="M270.005,0c-7.05,0-13.911,0.851-20.6,2.355c-39.076,8.838-71.781,41.487-96.041,75.074
        c-12.809,17.729-23.268,35.71-31.071,50.563c-13.886,26.433-25.967,55.417-35.582,84.401
        c-15.086,45.472-24.058,90.936-24.058,126.518c0,31.721,7.209,61.512,20.159,87.945c33.079,67.533,103.63,113.158,187.192,113.158
        c18.464,0,36.279-2.246,53.213-6.443c70.699-17.535,125.675-69.451,145.804-137.113c5.403-18.17,8.341-37.455,8.341-57.533
        c0-58.27-23.972-143.031-59.646-210.927C392.601,80.196,340.006,0,270.005,0z M315.58,113.771
        c30.142-11.077,65.681,10.165,79.377,47.442c13.702,37.276,0.373,76.476-29.768,87.553c-30.142,11.077-65.68-10.166-79.377-47.442
        C272.116,164.046,285.439,124.848,315.58,113.771z M114.71,433.717c-5.171,0-10.214-0.635-15.159-1.609
        c-15.723-27.35-24.664-59.064-24.664-93.182c0-36.391,9.761-83.581,25.998-130.289c4.523-0.808,9.113-1.359,13.819-1.359
        c51.843,0,93.875,50.692,93.875,113.221C208.584,383.025,166.552,433.717,114.71,433.717z M164.312,93.146
        c-1.493-1.327-2.84-2.771-4.101-4.271c24.168-34.657,57.437-69.131,96.806-75.539c9.309,19.449,4.566,46.322-13.666,66.794
        C220.47,105.814,185.084,111.646,164.312,93.146z M285.011,393.412c-23.678-0.135-42.742-23.979-42.577-53.27
        c0.166-29.291,19.492-52.92,43.17-52.785c23.679,0.135,42.742,23.979,42.577,53.27
        C328.017,369.91,308.689,393.545,285.011,393.412z M458.023,390.326C439.627,455.561,386.854,505.67,318.8,522.041
        c-8.825-30.379-0.71-67.717,24.296-97.436C374.498,387.285,422.271,374.207,458.023,390.326z"/>
        </g>
        </svg>`;
*/
/*Генерируем "Цель" */
const eggSvg =`<svg enable-background="new 0 0 24 24" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="${eggSize}px" height="${eggSize}px" style="position: fixed; z-index: 2; left: ${xPos}px; top: ${yPos}px;" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M19,13.8481445c-0.0117798-2.616272-0.331665-4.447998-1.0168457-5.7998047   C18.1484375,8.0246582,18.3126831,8,18.5,8C18.7763672,8,19,7.7763672,19,7.5C19,5.4472656,18.7402344,3,17.5,3   c-0.3088989,0-0.5864258,0.0828857-0.8806152,0.2022095C16.1723022,2.4692993,15.3781128,2,14.5,2   c-0.8208618,0-1.5440063,0.40271-2,1.0152588C12.0440063,2.40271,11.3208618,2,10.5,2   C9.7213135,2,9.0061646,2.3863525,8.5357056,3.0029907C8.5236206,3.0028076,8.512146,3,8.5,3   C7.288208,3,6.2763062,3.8795166,6.0605469,5.0479736C5.4276733,5.3826294,5,6.0371094,5,6.7919922v1.3881836   c0,0.3890991,0.2775269,0.7003784,0.6415405,0.7838745C5.2174683,10.2064209,5.0099487,11.7814331,5,13.8481445   C4.5996094,14.4589844,3,17.0219727,3,19c0,2.6103516,5.6386719,3,9,3s9-0.3896484,9-3   C21,17.0219727,19.4003906,14.4589844,19,13.8481445z" fill="#303C42"/><path d="M14.5,3c0.4802856,0,0.9199219,0.2342529,1.1967163,0.6103516   c-0.6078491,0.2633057-1.4326782,0.550415-2.6801758,0.7258301C13.0993652,3.586792,13.7289429,3,14.5,3z" fill="${fillColor}"/><path d="M14.8032837,3.5c0.2533569,0,0.4933472,0.0684814,0.7061157,0.1852417   c0.0609131-0.0249634,0.1303711-0.0502319,0.1873169-0.0748901C15.4199219,3.2342529,14.9802856,3,14.5,3   c-0.7710571,0-1.4006348,0.586792-1.4834595,1.3361816c0.1854248-0.026062,0.343689-0.0588379,0.5111084-0.0894165   C13.7869263,3.8049316,14.2543335,3.5,14.8032837,3.5z" fill="${fillColor}" opacity="0.2"/><path d="M10.5,3c0.8075562,0,1.4633179,0.6427002,1.4942017,1.4428101   c-0.3728027,0.0272217-0.7750854,0.0446777-1.2140503,0.0501099c-0.2318726-0.5276489-0.6361694-0.9494019-1.1332397-1.2086182   C9.8934326,3.1073608,10.18396,3,10.5,3z" fill="${fillColor}"/><path d="M10.3530884,3.5c0.6329956,0,1.1679077,0.3972168,1.3864746,0.9533081   c0.0808716-0.0048218,0.1764526-0.0047607,0.2546387-0.010498C11.9633179,3.6427002,11.3075562,3,10.5,3   c-0.31604,0-0.6065674,0.1073608-0.8530884,0.2843018c0.1432495,0.074707,0.2758789,0.1663208,0.4017944,0.2666626   C10.1484985,3.5281372,10.2468262,3.5,10.3530884,3.5z" fill="${fillColor}" opacity="0.2"/><path d="M8.5,4c0.4364624,0,0.8241577,0.2045288,1.1008301,0.5167236   C8.6846924,4.5418091,7.887207,4.6022949,7.2425537,4.7056885C7.5078125,4.2827148,7.9713135,4,8.5,4z" fill="#FFCA28"/><path d="M6,6.7919922C6,6.340332,6.2900391,5.9472656,6.7050781,5.8364258   C7.5371094,5.6132812,8.8134766,5.5,10.5,5.5c3.5048828,0,5.1054688-0.7397461,6.0615234-1.1816406   C16.9619141,4.1337891,17.2509766,4,17.4355469,3.9829102c0.2666016,0.1933594,0.5117188,1.5791016,0.5566406,3.043457   c-1.0009766,0.105957-1.7099609,0.5166016-2.3994141,0.9150391C14.6933594,8.4619141,13.7626953,9,12,9   c-1.7353516,0-2.8017578-0.2553711-3.3916016-0.4697266C7.7060547,8.2021484,6.8291016,8.0249023,6,8.0024414V6.7919922z" fill="${fillColor}"/><path d="M7,7.7919922C7,7.340332,7.2900391,6.9472656,7.7050781,6.8364258   C8.5371094,6.6132812,9.8134766,6.5,11.5,6.5c3.5048828,0,5.1054688-0.7397461,6.0615234-1.1816406   c0.1015625-0.046814,0.175415-0.0777588,0.2627563-0.1169434c-0.1038208-0.6405029-0.2423706-1.1123657-0.3887329-1.2185059   C17.2509766,4,16.9619141,4.1337891,16.5615234,4.3183594C15.6054688,4.7602539,14.0048828,5.5,10.5,5.5   c-1.6865234,0-2.9628906,0.1132812-3.7949219,0.3364258C6.2900391,5.9472656,6,6.340332,6,6.7919922v1.2104492   c0.3258057,0.0088501,0.6607666,0.048584,1,0.1049805V7.7919922z" fill="${fillColor}" opacity="0.2"/><path d="M12,21c-4.7099609,0-8-0.8222656-8-2c0-1.9023438,1.8935547-4.6894531,1.9121094-4.7172852   C5.9697266,14.1992188,6,14.1010742,6,14c0-2.1641235,0.2151489-3.7431641,0.6672974-4.9331665   C7.1804199,9.1382446,7.708252,9.2670288,8.2666016,9.4697266C9.234375,9.8217773,10.4902344,10,12,10   c2.03125,0,3.1269531-0.6337891,4.09375-1.1928711c0.3064575-0.1774292,0.5994263-0.3371582,0.9040527-0.4730835   C17.6777344,9.5671387,18,11.3804932,18,14c0,0.1010742,0.0302734,0.199707,0.0878906,0.2827148   C18.1064453,14.3105469,20,17.09375,20,19C20,20.1777344,16.7099609,21,12,21z" fill="#BA7118"/><path d="M6,19c0-1.9023438,1.420166-4.6894531,1.434082-4.7172852   C7.4772949,14.1992188,7.5,14.1010742,7.5,14c0-1.99646,0.1444092-3.4785767,0.4319458-4.6329956   C7.4974976,9.2294312,7.0752563,9.1235962,6.6672974,9.0668335C6.2151489,10.2568359,6,11.8358765,6,14   c0,0.1010742-0.0302734,0.1992188-0.0878906,0.2827148C5.8935547,14.3105469,4,17.0976562,4,19c0,1.1777344,3.2900391,2,8,2   C8.4675293,21,6,20.1777344,6,19z" fill="${fillColor}" opacity="0.2"/><path d="M18.0878906,14.2827148C18.0302734,14.199707,18,14.1010742,18,14   c0-2.6195068-0.3222656-4.4328613-1.0021973-5.6659546c-0.3046265,0.1359253-0.5975952,0.2956543-0.9040527,0.4730835   c-0.0482178,0.0278931-0.0987549,0.0563354-0.1477051,0.0844727C16.3200684,10.095459,16.5,11.7483521,16.5,14   c0,0.1010742,0.0227051,0.199707,0.065918,0.2827148C16.579834,14.3105469,18,17.09375,18,19c0,1.1777344-2.4675293,2-6,2   c4.7099609,0,8-0.8222656,8-2C20,17.09375,18.1064453,14.3105469,18.0878906,14.2827148z" opacity="0.1"/><linearGradient gradientUnits="userSpaceOnUse" id="SVGID_1_" x1="3.9473417" x2="22.0746651" y1="8.6152363" y2="17.0681458"><stop offset="0" style="stop-color:#FFFFFF;stop-opacity:0.2"/><stop offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/></linearGradient><path d="M19,13.8481445c-0.0117798-2.616272-0.331665-4.447998-1.0168457-5.7998047   C18.1484375,8.0246582,18.3126831,8,18.5,8C18.7763672,8,19,7.7763672,19,7.5C19,5.4472656,18.7402344,3,17.5,3   c-0.3088989,0-0.5864258,0.0828857-0.8806152,0.2022095C16.1723022,2.4692993,15.3781128,2,14.5,2   c-0.8208618,0-1.5440063,0.40271-2,1.0152588C12.0440063,2.40271,11.3208618,2,10.5,2   C9.7213135,2,9.0061646,2.3863525,8.5357056,3.0029907C8.5236206,3.0028076,8.512146,3,8.5,3   C7.288208,3,6.2763062,3.8795166,6.0605469,5.0479736C5.4276733,5.3826294,5,6.0371094,5,6.7919922v1.3881836   c0,0.3890991,0.2775269,0.7003784,0.6415405,0.7838745C5.2174683,10.2064209,5.0099487,11.7814331,5,13.8481445   C4.5996094,14.4589844,3,17.0219727,3,19c0,2.6103516,5.6386719,3,9,3s9-0.3896484,9-3   C21,17.0219727,19.4003906,14.4589844,19,13.8481445z" fill="url(#SVGID_1_)"/></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`;


        gameboard.innerHTML += eggSvg;  //добавляем "цель" на игровое поле (<div class="gameboard">)
    };

    const getCurrentScore = () => parseInt(score.textContent);  //Возвращает значение очков по запросу

    const checkScore = () => {                             //проверка текущего количества очков
        const currentScore = getCurrentScore();            //используем функцию, которая возвращает значение очков.

        if (currentScore == 30) {                           //Если количество очков равно 20
            const gameOverBoard = document.querySelector('.gameover-board'); //Подключаем блок по окончанию игры
            const closeButton = gameOverBoard.querySelector('.close');       //Подключаем кнопку закрытия
            const startAgain = gameOverBoard.querySelector(('.start-again')) //подключаем кнопку "запустить ещё раз"

            gameOverBoard.classList.add('gameover-board--shown');            //Подключаем класс, который показывает блок "игра окончена"
            closeButton.addEventListener('click', () => window.close());     //При нажатии на кнопку, которую связали с переменной closeButton  закрывается окно
            startAgain.addEventListener('click', () => location.reload());  // При нажатии кнопки, которая связанна с переменной startAgain - обновляется страница
        }
    }

    const incrementScore = () => {                            //функция, которая увеличивает очки
        score.textContent = getCurrentScore() + 1;
        checkScore();                                           //Запускается проверка, не достигли ли максимального кличества очков.
    };

    const increaseSizeOfTheDino = () => {                           //Создаем размер игрока (динозавра)
        const dino = document.querySelector('.dino');               //свящываем переменную dino с элементом .dino
        const prevHeight = getComputedStyle(dino).height;           //получаем высоту элемента с игроком (динозавром)
        const prevWidth = getComputedStyle(dino).width;             //получаем ширину элемента с игроком (динозавром)

        dino.style.height = `${prevHeight + (prevHeight * 0.05)}px;`; //увеличиваем высоту игрока (динозавра) на 5%
        dino.style.width = `${prevWidth + (prevWidth * 0.05)}px;`;    //увеличиваем ширину игрока (динозавра) на 5%
    };


    const isDinoReachedEgg = () => {                                   //функция, которая проверяет словил ли игрок (динозавр) цель (яйцо)
        const dino = document.querySelector('.dino');                   //связываем переменную dino и элемент .dino
        const egg = document.querySelector('svg');                      //связываем переменную egg и элемент svg

        const eggPosX = parseInt(getComputedStyle(egg).left);           //в переменную eggPosX помещаем текущую координату Х для цели (значение left)
        const eggPosY = parseInt(getComputedStyle(egg).top);            //в переменную eggPosY помещаем текущую координату Y для цели (значение top)
        const eggW = parseInt(getComputedStyle(egg).width);             //В переменную eggW помещаем значение ширины цели (яйца)
        const eggH = parseInt(getComputedStyle(egg).height);            //В переменную eggH помещаем значение ширины цели (яйца)
//получаем значения для динозавра
        const dinoPosX = parseInt(getComputedStyle(dino).left);       
        const dinoPosY = parseInt(getComputedStyle(dino).top);
        const dinoW = parseInt(getComputedStyle(dino).width);
        const dinoH = parseInt(getComputedStyle(dino).height);

        const isDinoOverEggOnXAxis = dinoPosX < eggPosX && dinoPosX + dinoW > eggPosX + eggW;  //определяем "словил" ли игрок (динозавр) цель (яйцо) по оси Х
        const isDinoOverEggOnYAxis = dinoPosY < eggPosY && dinoPosY + dinoH > eggPosY + eggH;  //определяем "словил" ли игрок (динозавр) цель (яйцо) по оси Y

        if (isDinoOverEggOnXAxis && isDinoOverEggOnYAxis) { //если игрок (динозавр) словил цель (яйцо) по обоим осям
            egg.remove();                                   //убирает яйцо (цель)
            generateEgg();                                  //генерируется яйцо (цель)
            incrementScore();                               //Запускается функция incrementScore(); , которая увеличивает значение на 1
            increaseSizeOfTheDino();                        //запускается функция increaseSizeOfTheDino();, которая увеличивает размер динозавра
        }

    };
    generateEgg();                                          //создается цель (яйцо) - в самом начале


    document.addEventListener('keydown', event => {           //Устанавливается "слушатель", который запускается при нажатии клавиши (событие keydown)
        const { key } = event;
        const dino = document.querySelector('.dino');           
        const step = 50;                                        //Устанавливается шаг перемещения игрока (динозавра)
        let oldPosition = '';

        switch (event.key) {                                    //оператор множественного выбора, в зависимости от
            case "ArrowDown":                           
                oldPosition = parseInt(getComputedStyle(dino).top);  //Вычисляем "прошлую позицию"
                dino.style.top = `${oldPosition + step}px`;         //изменяем позицию по вертикали - опускаем вниз (значение top)
                break;
            case "ArrowUp":
                oldPosition = parseInt(getComputedStyle(dino).top);  //Вычисляем "прошлую позицию"
                dino.style.top = `${oldPosition - step}px`;             //изменяем позицию по вертикали - поднимаем вниз (значение top)
                break;

            case "ArrowLeft":                                           
                oldPosition = parseInt(getComputedStyle(dino).left);   //Вычисляем "прошлую позицию"
                dino.style.left = `${oldPosition - step}px`;            //изменяем позицию по горизонталии - смещаем влево (значение left)
                break;

            case "ArrowRight":
                oldPosition = parseInt(getComputedStyle(dino).left);
                dino.style.left = `${oldPosition + step}px`;
                break;
        }

        isDinoReachedEgg();
    });


});