import { Meta, StoryObj } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "account.ftl",
});

const meta: Meta = {
  title: "account/Account",
  component: PageStory,
} satisfies Meta<typeof PageStory>;
export default meta;

type Story = StoryObj<typeof PageStory>;

export const Default: Story = {
  render: () => (
    <PageStory
      kcContext={{
        message: { type: "warning", summary: "This is a test message" },
      }}
    />
  ),
};
