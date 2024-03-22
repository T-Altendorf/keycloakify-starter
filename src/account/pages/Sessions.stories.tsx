import { Meta, StoryObj } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "sessions.ftl",
});

const meta = {
  title: "account/Sessions",
  component: PageStory,
} satisfies Meta<typeof PageStory>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageStory
      kcContext={{
        message: { type: "success", summary: "This is a test message" },
      }}
    />
  ),
};
