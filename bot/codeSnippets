//get current unix time
var unixTimestamp = Math.floor(Date.now() / 1000);
console.log(unixTimestamp);

//converting date to unix
//Converting a specific date string
var dateString = '2024-01-04T00:00:00.000Z'; 
var calcDate = new Date(dateString);
var unixTimestamp = Math.floor(calcDate.getTime() / 1000);
console.log(unixTimestamp); // Output: 1704326400

//localized replies
client.on(Events.InteractionCreate, (interaction) => {
	const locales = {
		pl: 'Witaj Świecie!',
		de: 'Hallo Welt!',
	};
	interaction.reply(locales[interaction.locale] ?? 'Hello World (default is english)');
});

//Converting unix to Date                        
var nowtimestamp = Math.floor(Date.now())
var tempdate = new Date(nowtimestamp)
//Where 'ru' is locale and 'Etc/GMT-3' means GMT+3. Also works backwards: 'Etc/GMT+3' means GMT-3
var iso = tempdate.toLocaleString(`en-UK`, { timeZone: `Etc/GMT-3`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `3`, weekday: "long" })
// Output: Tuesday, 16 December 2025 at 18:41:46.670 GMT+03:00
console.log(iso)

//experimental
var nowtimestamp = Math.floor(Date.now())
var tzdate = new Date(nowtimestamp)
var testlocale = interaction.locale
if (testlocale === 'ru' || testlocale === 'en-US') {
            var timelocale = interaction.locale
        } else { 
            var timelocale = 'en-UK' 
        }
var iso = tempdate.toLocaleString(`${timelocale}`, { timeZone: 'Etc/GMT-3', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: "long" })
console.log(iso)

//difference of dates
var arg1 = 1354
var arg2 = 1353
var diff = Math.abs(arg2 - arg1)
console.log(diff)

//HTML
<!-- INPUT UNIX TIME AND CONVERT TO DATE -->
<div id="unix-converter-container" style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px; max-width: 350px; background-color: #f9f9f9;">
    <label for="unix-input" style="display: block; margin-bottom: 8px; font-size: 14px;">Введите UNIX время:</label>
    
    <div style="display: flex; gap: 5px; margin-bottom: 10px;">
        <input type="number" id="unix-input" placeholder="Например: 1734707038" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        <select id="unix-unit" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            <option value="s">Сек (s)</option>
            <option value="ms">Мс (ms)</option>
        </select>
    </div>
    
    <button id="calculate-btn" style="width: 100%; padding: 10px; cursor: pointer; background-color: #28a745; color: white; border: none; border-radius: 4px; font-weight: bold;">Рассчитать</button>

    <div id="result-area" style="margin-top: 15px; font-size: 13px; color: #333; line-height: 1.5; border-top: 1px solid #eee; padding-top: 10px;">
        <!-- Здесь появится результат -->
    </div>
</div>

<script>
    // Глобальные переменные согласно ТЗ
    let cvyear, cvmonth, cvdayi, cvhouri, cvmini, cvseci, cvmsi, gettimestamp;

    document.getElementById('calculate-btn').addEventListener('click', function() {
        const rawValue = document.getElementById('unix-input').value;
        const unit = document.getElementById('unix-unit').value;
        
        if (!rawValue) {
            alert('Введите значение UNIX timestamp');
            return;
        }

        // Преобразуем ввод в число. Если выбраны секунды — умножаем на 1000 для JS Date
        let timestampMs = parseFloat(rawValue);
        if (unit === 's') {
            timestampMs *= 1000;
        }

        const dateObj = new Date(timestampMs);

        // Проверка на корректность даты
        if (isNaN(dateObj.getTime())) {
            alert('Некорректный формат времени');
            return;
        }

        // Заполнение переменных
        cvyear = dateObj.getFullYear().toString();
        cvmonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        cvdayi = dateObj.getDate().toString().padStart(2, '0');
        cvhouri = dateObj.getHours().toString().padStart(2, '0');
        cvmini = dateObj.getMinutes().toString().padStart(2, '0');
        cvseci = dateObj.getSeconds().toString().padStart(2, '0');
        cvmsi = dateObj.getMilliseconds().toString().padStart(3, '0');

        // Итоговый timestamp (в миллисекундах)
        gettimestamp = dateObj.getTime();

        // Вывод в HTML блок
        document.getElementById('result-area').innerHTML = `
            <strong>Переменные:</strong><br>
            cvyear: '${cvyear}', cvmonth: '${cvmonth}', cvdayi: '${cvdayi}'<br>
            cvhouri: '${cvhouri}', cvmini: '${cvmini}', cvseci: '${cvseci}', cvmsi: '${cvmsi}'<br>
            <hr style="border: 0; border-top: 1px dashed #ccc;">
            <strong>gettimestamp:</strong> ${gettimestamp}
        `;
        
        // Для отладки в консоли
        console.log("Результаты сохранены в переменные:", {cvyear, cvmonth, cvdayi, cvhouri, cvmini, cvseci, cvmsi, gettimestamp});
    });
</script>

//HTML
<!-- DatePicker and convert it to UNIX -->
<div id="datetime-picker-container" style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px; max-width: 300px;">
    <label for="dt-input" style="display: block; margin-bottom: 10px;">Выберите дату и время:</label>
    <input type="datetime-local" id="dt-input" step="0.001" style="width: 100%; margin-bottom: 10px; padding: 5px;">
    
    <button id="calculate-btn" style="width: 100%; padding: 10px; cursor: pointer; background-color: #007bff; color: white; border: none; border-radius: 4px;">Рассчитать</button>

    <div id="result-area" style="margin-top: 15px; font-weight: bold; word-break: break-all;"></div>
</div>

<script>
    // Инициализация переменных в глобальной области видимости
    let cvyear, cvmonth, cvdayi, cvhouri, cvmini, cvseci, cvmsi, gettimestamp;

    document.getElementById('calculate-btn').addEventListener('click', function() {
        const input = document.getElementById('dt-input').value;
        
        if (!input) {
            alert('Пожалуйста, выберите дату и время');
            return;
        }

        const dateObj = new Date(input);

        // Заполнение переменных в требуемом формате
        cvyear = dateObj.getFullYear().toString();
        cvmonth = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        cvdayi = dateObj.getDate().toString().padStart(2, '0');
        cvhouri = dateObj.getHours().toString().padStart(2, '0');
        cvmini = dateObj.getMinutes().toString().padStart(2, '0');
        cvseci = dateObj.getSeconds().toString().padStart(2, '0');
        cvmsi = dateObj.getMilliseconds().toString().padStart(3, '0');

        // Получение UNIX timestamp (в миллисекундах)
        gettimestamp = dateObj.getTime();

        // Вывод результата
        document.getElementById('result-area').innerHTML = `
            <p style="font-size: 0.8em; font-weight: normal; color: #555;">
                Год: ${cvyear}, Мес: ${cvmonth}, День: ${cvdayi}, <br>
                Час: ${cvhouri}, Мин: ${cvmini}, Сек: ${cvseci}, Мс: ${cvmsi}
            </p>
            Результат (gettimestamp): <br> ${gettimestamp}
        `;
        
        console.log({cvyear, cvmonth, cvdayi, cvhouri, cvmini, cvseci, cvmsi, gettimestamp});
    });
</script>

