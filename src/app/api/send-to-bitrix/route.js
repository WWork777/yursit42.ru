import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, message, formType, userType, topic } = body;

    // Определяем заголовок в зависимости от типа формы
    let title = "Заявка с сайта (Кемерово)";
    let sourceDescription = "Форма на сайте";

    if (formType === "hero_form") {
      title = "Заявка с сайта (Кемерово)";
      sourceDescription = "Форма в hero-блоке";
    } else if (formType === "consultation_form") {
      title = "Заявка с сайта (Кемерово)";
      sourceDescription = "Форма консультации";
    } else if (formType === "quiz_form") {
      title = "Заявка квиз (Кемерово)";
      sourceDescription = "Квиз-форма";
    }

    // Очищаем телефон (убираем пробелы и скобки, но оставляем +)
    const cleanPhone = phone.replace(/[\s\(\)\-]/g, "");

    // ID ответственного сотрудника
    const RESPONSIBLE_ID = 608;

    // Статус "Поступившая Заявка"
    const STATUS_ID = "NEW";

    // Формируем расширенный комментарий для квиза
    let fullComment = message || "Не указано";

    // Если это квиз и есть дополнительные поля, добавляем их в комментарий
    if (formType === "quiz_form" && (userType || topic)) {
      const userTypeText =
        userType === "individual" ? "Физическое лицо" : "Юридическое лицо";

      fullComment = `=== ДАННЫЕ ИЗ КВИЗА ===\n`;
      fullComment += `Тип клиента: ${userTypeText || "Не указано"}\n`;
      fullComment += `Тема вопроса: ${topic || "Не указано"}\n`;
      fullComment += `Комментарий клиента: ${message || "Не указано"}\n`;
      fullComment += `=====================`;
    }

    // Формируем данные для отправки в Битрикс24
    const bitrixData = {
      fields: {
        TITLE: title,
        NAME: name || "Не указано",
        PHONE: [
          {
            VALUE: cleanPhone,
            VALUE_TYPE: "WORK",
          },
        ],
        SOURCE_ID: "WEB", // Источник - сайт
        SOURCE_DESCRIPTION: sourceDescription, // Описание источника
        COMMENTS: fullComment, // Расширенный комментарий

        // 👇 Назначаем ответственного
        ASSIGNED_BY_ID: RESPONSIBLE_ID,

        // 👇 Указываем статус "Поступившая Заявка"
        STATUS_ID: STATUS_ID,
      },
    };

    // Если есть email, можно добавить (на будущее)
    // if (email) {
    //   bitrixData.fields.EMAIL = [{ VALUE: email, VALUE_TYPE: "WORK" }];
    // }

    console.log("Отправка в Битрикс24:", JSON.stringify(bitrixData, null, 2));

    // Отправляем запрос в Битрикс24
    const response = await fetch(
      "https://kodeks42.bitrix24.ru/rest/800/sqc7mpvr9bp2nfer/crm.lead.add.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bitrixData),
      },
    );

    const result = await response.json();
    console.log("Ответ от Битрикс24:", result);

    // Проверяем, создался ли лид
    if (result.error) {
      console.error(
        "Ошибка Битрикс24:",
        result.error_description || result.error,
      );
      return NextResponse.json(
        {
          success: false,
          error: result.error_description || "Ошибка при создании лида",
          details: result,
        },
        { status: 400 },
      );
    }

    // Возвращаем успешный ответ с ID созданного лида
    return NextResponse.json({
      success: true,
      leadId: result.result,
      message: "Лид успешно создан",
    });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
