import React from 'react';
import Footer from 'rc-footer';

export default function FooterComponent() {
    return (
    <div>
      <Footer
      theme='light'
        columns={[
          {
            items: [
              {
                icon: (
                  <img
                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    alt="GitHub"
                  />
                ),
                title: 'GitHub',
                url: 'https://github.com/andnasnd',
                openExternal: true,
              },
              {
                icon: (
                  <img
                    src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
                    alt="Twitter"
                  />
                ),
                title: 'Twitter',
                url: 'https://twitter.com/andnasnd',
                openExternal: true,
              },
            ],
          },
        ]}
        bottom="Made with ❤️ by anandn"
      />
    </div>
    );
}