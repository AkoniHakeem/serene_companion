import StatusCodes from "http-status-codes";
import { Request, RequestHandler, Response, Router } from "express";
import { SelectOption, Text, TextType } from "src/types/types";
import axios from "axios";

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

const path = {
  events: "/events",
};

const botResponse: RequestHandler = async (req: Request, res: Response) => {
  /* handle command - use a try catch */
  const messageBody = req.body as Record<string, unknown>;
  const selectBlock = {
    type: "input",
    element: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: "Select an item",
        emoji: true,
      },
      options: [],
      action_id: "static_select-action",
    },
    label: {
      type: "plain_text",
      text: "Please, select an item",
      emoji: true,
    },
  };

  const textBlock = {
    type: "context",
    elements: [],
  };

  const firstOptionsSet = ["Doing Well", "Neutral", "Feeling Lucky"];
  const conversation = {
    blocks: [] as Record<string, unknown>[],
  };

  (textBlock.elements as Text[]).push({
    type: TextType.PLAIN_TEXT,
    text: "Welcome. How are you doing?",
    emoji: false,
  });

  (selectBlock.element.options as SelectOption[]).push(
    ...firstOptionsSet.map(
      (optionText, index) =>
        ({
          value: String(index),
          text: {
            type: TextType.PLAIN_TEXT,
            text: optionText,
            emoji: true,
          },
        } as SelectOption)
    )
  );
  conversation.blocks.push(textBlock);
  conversation.blocks.push(selectBlock);
  // firstConversation.blocks = firstOptionsSet.map((option) => selectBlock.element.options.pu)
  if ("payload" in messageBody) {
    const secondOptionsSet = [
      "Football",
      "Music",
      "Sleep",
      "Movies",
      "Basketball",
    ];
    const message = JSON.parse(messageBody.payload as string);

    const { actions: payloadActions } = message as {
      actions: {
        type: "static_select" | string;
        selected_option: SelectOption;
      }[];
    };

    //   console.log(messagePayload);
    const staticSelect = payloadActions.find(
      (item) => item.type === "static_select"
    ) as {
      type: "static_select" | string;
      selected_option: SelectOption;
    };
    const selectedOptionText = staticSelect.selected_option.text.text;

    if (
      firstOptionsSet.findIndex((option) => option === selectedOptionText) !==
        -1 &&
      "response_url" in message
    ) {
      /* send second conversion */
      res.sendStatus(200);
      const responseUrl = message.response_url as string;
      (textBlock.elements as Text[]) = [
        {
          type: TextType.PLAIN_TEXT,
          text: "What are your favorite hobbies?",
          emoji: false,
        },
      ];
      (selectBlock.element.options as SelectOption[]) = secondOptionsSet.map(
        (optionText, index) =>
          ({
            value: String(index),
            text: {
              type: TextType.PLAIN_TEXT,
              text: optionText,
              emoji: true,
            },
          } as SelectOption)
      );
      conversation.blocks = [];
      conversation.blocks.push(textBlock);
      conversation.blocks.push(selectBlock);

      await axios.post(responseUrl, conversation);
      return;
    } else if (
      secondOptionsSet.findIndex((option) => option === selectedOptionText) !==
      -1
    ) {
      /* send thank you */
      (textBlock.elements as Text[]) = [
        {
          type: TextType.PLAIN_TEXT,
          text: "thank you?",
          emoji: false,
        },
      ];
      conversation.blocks = [];
      conversation.blocks.push(textBlock);
    } else {
      /* handle implementation */
    }
  }
  return res.status(200).json(conversation);
};

router.post(path.events, botResponse);
export default router;
