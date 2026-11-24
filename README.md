# Лаборатори 1 — Playwright UI автомат тест

- **Нэр** Ган-Оргил
- **Оюутны код** B232270091
- **Хичээл** F.CSA313 — Программ хангамжийн чанарын баталгаа ба тест
- **Туршсан орчин** Windows 11, Node.js v26.13.0, Playwright 1.65.1, Chromium 159.0.8154.6

## Ажиллуулах

Репогийн үндсэн хавтсанд дараах командуудыг ажиллуулна. Тест нь [Sauce Demo](https://www.saucedemo.com/) руу ханддаг тул интернэт холболт хэрэгтэй.

```sh
npm ci
npx playwright install chromium
npx playwright test
```

PowerShell скрипт ажиллуулахыг хаавал `npm.cmd`, `npx.cmd` ашиглаж болно.

## Тайлан ба бичлэг

- [Гурван тестийн HTML тайлан](artifacts/html-report/index.html)
- [Codegen-ээр бичүүлсэн нэвтрэх, гарах үйлдэл](artifacts/codegen-login.txt)
- [Санаатай унагасан assertion-ийн trace](artifacts/failing-assertion.trace.zip)

```sh
npx playwright show-report artifacts/html-report
npx playwright show-trace artifacts/failing-assertion.trace.zip
```

Codegen-ээр дахин бичүүлэхдээ `npx playwright codegen --test-id-attribute data-test https://www.saucedemo.com/` командыг ажиллуулна.

## Дүгнэлт

Sauce Demo дээр зөв нэвтрэх, буруу нууц үгийн алдаа, нэг бараа сагслах гэсэн гурван тест бичлээ.
Тест бүр шинэ браузерийн context-оос эхэлсэн бөгөөд цэсээр гарахад нэвтрэх хуудас буцаж ирснийг шалгасан.
`getByRole`, `getByText`, `getByTestId` нь элементийг үүрэг, бичвэр, таних тэмдгээр нь олдог тул DOM-ийн байрлал өөрчлөгдөхөд XPath-аас бага хамаарна.
Codegen `Login` товчийг `data-test`-аар олсон бөгөөд өөрийн тестэд товчны үүргээр хайж, `Products` болон хуудасны URL-ийг давхар шалгасан.
`Inventory` гэсэн буруу утга зориуд хүлээхэд Trace Viewer-ийн `Errors` хэсгээс бодит `Products` утга болон унасан алхмыг харлаа.

Товч дарахад бэлэн болохыг Playwright өөрөө хүлээсэн нь тестийн алхмуудыг энгийн болгосон.
Selenium-ийн зааварт динамик элементэд `WebDriverWait`-аар нөхцөл хүлээх жишээ бий. [Selenium waits](https://www.selenium.dev/documentation/webdriver/waits/)
Selenium Manager драйверын тохиргоог автоматжуулдаг бөгөөд Playwright дээр энэ дасгалын Chromium-ийг `install chromium` командаар бэлдсэн. [Selenium Manager](https://www.selenium.dev/documentation/selenium_manager/)
Playwright-ийн HTML тайлангаас гурван тестийн үр дүнг нэг дор харж, алдаатай алхмыг trace-ээр тусад нь шалгахад дөхөм байлаа.
