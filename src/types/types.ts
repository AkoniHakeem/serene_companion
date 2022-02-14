export type SelectOption = {
  value: string;
  text: Text;
};

export enum TextType {
  PLAIN_TEXT = "plain_text",
  MARK_DOWN = "mrkdwn",
}

export type Text = {
  type: TextType;
  text: string;
  emoji?: boolean;
};
