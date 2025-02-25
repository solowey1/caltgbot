import { useState } from "react";
import { Form } from "react-router-dom";
import { sendData } from "@telegram-apps/sdk";
import {
  List,
  Cell,
  Input,
  Checkbox,
  Button,
} from "@telegram-apps/telegram-ui";
import dayjs from "dayjs";
import { Page } from "@/components/Page.jsx";

export function FormPage() {
  const [isFromSending, setIsFromSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsFromSending(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (sendData.isAvailable()) {
      sendData(JSON.stringify(data));
      setIsFromSending(false);
    }
  };

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <List>
          <Input
            type="date"
            header="Дата"
            placeholder={dayjs().format("DD.MM.YYYY")}
            required
          />
          <Input
            type="time"
            header="Время"
            placeholder={dayjs().format("HH:mm")}
            required
          />
          <Input
            type="text"
            header="Название мероприятия"
            placeholder="Важное дело"
            required
          />
          <Input type="text" header="Описание" placeholder="Прогуляться" />
          <Cell
            Component="label"
            before={<Checkbox name="checkbox" value="telemost" />}
            multiline
          >
            Создать видео-встречу
          </Cell>
          <Button
            disabled={isFromSending}
            loading={isFromSending}
            mode="filled"
            size="m"
            stretched
          >
            Создать событие
          </Button>
        </List>
      </Form>
    </Page>
  );
}
