'use strict'
/* eslint-env browser, webextensions */

const browser = require('webextension-polyfill')
const html = require('choo/html')
const navItem = require('./nav-item')

module.exports = function operations ({
  active,
  ipfsNodeType,
  isIpfsOnline,
  redirectEnabled,
  uploadEnabled,
  onQuickUpload,
  onOpenWebUi,
  onOpenPrefs,
  onToggleRedirect
}) {
  return html`
    <div class="fade-in pv1">
      ${isIpfsOnline && uploadEnabled ? (
        navItem({
          text: browser.i18n.getMessage('panel_quickUpload'),
          bold: true,
          onClick: onQuickUpload
        })
      ) : null}
      ${ipfsNodeType === 'external' && isIpfsOnline ? (
        navItem({
          text: browser.i18n.getMessage('panel_openWebui'),
          onClick: onOpenWebUi
        })
      ) : null}
      ${navItem({
        text: browser.i18n.getMessage('panel_openPreferences'),
        onClick: onOpenPrefs
      })}
      ${active && ipfsNodeType === 'external' ? (
        navItem({
          text: browser.i18n.getMessage(
            redirectEnabled
              ? 'panel_switchToPublicGateway'
              : 'panel_switchToCustomGateway'
          ),
          onClick: onToggleRedirect
        })
      ) : null}
    </div>
  `
}
