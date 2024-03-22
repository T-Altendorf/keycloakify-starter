// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx
import "./assets/fontawesome-free/css/all.css";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/account/TemplateProps";
import { useGetClassName } from "keycloakify/account/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";

const localeFromURL = new URL(window.location.href).searchParams.get("locale");

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  const { msg, changeLocale } = i18n;

  const { url, features, realm, message } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: false,
    styles: [
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
      `${url.resourcesPath}/css/account.css`,
    ],
    htmlClassName: getClassName("kcHtmlClass"),
    bodyClassName: clsx("admin-console", "user", getClassName("kcBodyClass")),
  });

  if (!isReady) {
    return null;
  }
  if (localeFromURL !== null) changeLocale(localeFromURL);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="bs-sidebar col-md-3">
            <div className="list-group-wrapper">
              <ul className="list-group">
                <a href={url.accountUrl}>
                  <li
                    className={clsx(
                      "list-group-item",
                      active === "account" && "active"
                    )}
                  >
                    <i className="fas fa-user"> </i> {msg("account")}
                  </li>
                </a>
                {features.passwordUpdateSupported && (
                  <a href={url.passwordUrl}>
                    <li
                      className={clsx(
                        "list-group-item",
                        active === "password" && "active"
                      )}
                    >
                      <i className="fas fa-key"> </i> {msg("password")}
                    </li>
                  </a>
                )}
                <a href={url.totpUrl}>
                  <li
                    className={clsx(
                      "list-group-item",
                      active === "totp" && "active"
                    )}
                  >
                    <i className="fas fa-shield-alt"> </i>{" "}
                    {msg("authenticator")}
                  </li>
                </a>
                {features.identityFederation && (
                  <a href={url.socialUrl}>
                    <li
                      className={clsx(
                        "list-group-item",
                        active === "social" && "active"
                      )}
                    >
                      <i className="fas fa-users"> </i>{" "}
                      {msg("federatedIdentity")}
                    </li>
                  </a>
                )}
                <a href={url.sessionsUrl}>
                  <li
                    className={clsx(
                      "list-group-item",
                      active === "sessions" && "active"
                    )}
                  >
                    <i className="fas fa-clock"> </i> {msg("sessions")}
                  </li>
                </a>
                <a href={url.applicationsUrl}>
                  <li
                    className={clsx(
                      "list-group-item",
                      active === "applications" && "active"
                    )}
                  >
                    <i className="fas fa-th"> </i> {msg("applications")}
                  </li>
                </a>
                {features.log && (
                  <a href={url.logUrl}>
                    <li
                      className={clsx(
                        "list-group-item",
                        active === "log" && "active"
                      )}
                    >
                      <i className="fas fa-file-alt"> </i> {msg("log")}
                    </li>
                  </a>
                )}
                {realm.userManagedAccessAllowed && features.authorization && (
                  <a href={url.resourceUrl}>
                    <li
                      className={clsx(
                        "list-group-item",
                        active === "authorization" && "active"
                      )}
                    >
                      <i className="fas fa-lock"> </i> {msg("myResources")}
                    </li>
                  </a>
                )}
              </ul>
            </div>
          </div>

          <div className="col-md-9 content-area">
            {message !== undefined && (
              <div className={clsx("alert", `alert-${message.type}`)}>
                {message.type === "success" && (
                  <span className="pficon pficon-ok"></span>
                )}
                {message.type === "error" && (
                  <span className="pficon pficon-error-circle-o"></span>
                )}
                <span className="kc-feedback-text">{message.summary}</span>
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </>
  );
}
