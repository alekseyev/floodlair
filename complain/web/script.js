// Array extensions
Array.prototype.sample = function () {
    if (this.length > 0)
        return this[Math.floor(Math.random() * this.length)];
};
var consolations = [{ text: "Зато вы совсем не толстый!" }, { text: "Не огорчайтесь! Лучше скушайте это пирожное… Ах, вам же его нельзя!" }, { text: "Подумаешь! Зато в профиль вы немного похожи на Лёшу!" }, { text: "Могло быть и хуже! Например, вы могли родиться Креведом. Или неклёвым карликом. Или вам подали бы обед с опозданием в минуту. Или ваш интернет мог бы иногда пропадать без каких-либо причин. Ну вот, теперь у меня депрессия… Довольны?!" }, { text: "Все будет хорошо! Вот станете президентом, и обнаженный Стиплер с обнаженным Лёшей будут драться за право укутать вас пледиком!" }, { text: "Кто у нас тут самый несчастный котик? Иди скорее обниму :)" }, { text: "((((((((" }, { text: "Не печальтесь, лучше выпейте вечернего кефира, бессердечный вы фашист!" }, { text: "Ну и пусть! Зато вы увиделись с гигантским птеродактилем!" }, { text: "there there" }, { text: "Отныне все ваши печали позади! Купите книгу “100 рецептов успеха от Петровича” и… и у Петровича будут деньги, чтобы угостить Товарища латте!" }, { text: "Не думайте об этом! Лучше думайте о Товарище!" }, { text: "Зато вам платья идут больше, чем Лю!" }, { text: "Отпустите бороду! С бородатыми людьми этого никогда не случается." }, { text: "Ах вы бедная принцесса!" }, { text: "Хм!" }, { text: "Бегите же скорее в подвал! Школьницы вас утешат!" }, { text: "Ничего! Вот посмотрите на Лёшу!<br>…Здорово, да?" }, { text: "Зато теперь вам повысят пенсию!" }, { text: "Не печальтесь, выше нос! Представьте себе, что вы Кревед и задеваете носом солнце! И да, я помню, что вы ненавидите Креведа и солнце." }, { text: "Зато вы победили в “Легат-турнире”!" }, { text: "Печалька :(" }, { text: "Зато вы скоро уедете на дачу! Вы же любите дачу!" }, { text: "Зато где-то есть садовый гном, который думает о вас!" }, { text: "Немедленно прекратите! Сейчас по графику не нытьё, а завтрак! Или второй завтрак! Или обед!" }, { text: "А постримьте?" }, { text: "Да." }, { text: "Нет." }, { text: "А Ницшенька назвал бы вас сверхчеловечком!" }, { text: "Подумайте, если бы Гайбраш предавался унынию, разве смог бы он покончить с Ле Чаком раз и навсегда? Oh, wait…" }, { text: "Партия против Лю в любую игру со столицами легко поднимет вам настроение!" }, { text: "Каждый раз, когда вы делитесь своими проблемами на этом сайте, где-то в мире грустит один Лёша. Так что занимайтесь этим почаще!" }, { text: "Безусловно, это очень серьёзно. Но разве все дурные вещи в мире перевешивают благодать сырных палочек и реслинга?" }, { text: "Уверен, именно сейчас вам могут снова подарить радость в жизни эти амулеты Святого Гайбраша ИЗ НАСТОЯЩЕГО ПРОБКОВОГО ДЕРЕВА! ДА-ДА, ВЫ НЕ ОСЛЫШАЛИСЬ: “НАСТОЯЩЕЕ ПРОБКОВОЕ ДЕРЕВО”! ГАРАНТИЯ КАЧЕСТВА И ДОЛГОВЕЧНОСТИ! ЗАКАЖИТЕ ПРЯМО СЕЙЧАС!" }, { text: "Мне следует предложить вам напиток!", choices: [{ query: "Вы расстроены?", text: "чай", image: "tea.jpg" }, { query: "Вы возмущены?", text: "какао", image: "cappuccino.jpg" }, { query: "Вы фашист?", text: "кефир", image: "kefir.jpg" }] }, { text: "А хотите, дам вам совет?", choices: [{ query: "Да.", text: "Хей, сюда можно заглушку, этот вариант он никогда не выберет!" }, { query: "Нет.", text: "Ну и ладно! Ну и пожалуйста!" }] }];
function GetConsolation() {
    return IsFirstTimer() ? consolations[0] : consolations.sample();
}
function IsFirstTimer() {
    if (document.cookie.match(/seen/i))
        return false;
    document.cookie = "seen=1; expires=Tue, 1 Jan 2036 12:00:00 GMT; path=/";
    return true;
}
function ShowSelection(choice) {
    var solution = $("#solution");
    $("#solution").empty();
    var consolation = $("<p>");
    consolation.text(choice.text);
    solution.append(consolation);
    if (choice.image) {
        var image = $("<img src='img/" + choice.image + "'>");
        solution.append(image);
    }
    var link = $("<a href='#'>");
    link.text("Ещё пожаловаться");
    link.click(HideConsolation);
    solution.append(link);
}
function ShowConsolation() {
    var consolation = GetConsolation();
    var solution = $("#solution");
    $("#solution").empty();
    if (consolation.choices) {
        solution.append("<p class='large'>" + consolation.text + "</p>");
        var ul = $("<ul>");
        for (var i = 0; i != consolation.choices.length; ++i) {
            var choice = consolation.choices[i];
            var li = $("<li>");
            li.text(choice.query);
            li.click(ShowSelection.bind(null, choice));
            ul.append(li);
        }
        solution.append(ul);
    }
    else {
        var text = "<p>" + consolation.text + "</p>";
        var link = "<a href='#' onclick='HideConsolation()'>Ещё пожаловаться</a>";
        solution.html(text + link);
    }
    $("#problem").hide();
    solution.show();
}
function HideConsolation() {
    $("#textarea").val("");
    $("#problem").show();
    $("#solution").hide();
}
// setup
$("#button").click(ShowConsolation);
