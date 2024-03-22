import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function MyExtraPage1(
  props: PageProps<
    Extract<KcContext, { pageId: "federatedIdentity.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      active="federatedIdentity"
    >
      <h1>Hello world 1</h1>
    </Template>
  );
}
