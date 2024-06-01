---
title:      HOW TO BUILD YOUR WEBSITE FOR FREE
date:       2024-06-01
author:     RinCynar
categories: [IT,Internet,Website]
tags: [IT,free,Internet,build,website,domainName]
---
## Preface
These days I have been researching how to build my own website for free. Now I record all of this here, hoping it can help you who want to build a website but don’t want to spend money.

## Things You Need to Have

### A computer with Internet access
Haven't? Buy one!(bushi).Try do that in phone is really cool right?

### A Github Accounts
Haven't? Sign up! 
[This is a guide.](https://rcva.san.tc/posts/HOW-TO-REGISTER-A-GITHUB-ACCOUNT) 

### A smart person --You
## Start!
### First,find your favorite theme template on GitHub
Generally speaking, just [search](https://github.com/search?q=jekyll+themes&type=repositories) for jekyll themes and select it.
Here are some recommended templates, but the following operations will be explained using the template [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) used on this site as an example.

<a href="https://github.com/Huxpro/huxpro.github.io">
    <img border="0" src="/assets/img/image/image@20240601bywff10.png" alt="themes by Hux" />
</a><br>
<a href="https://github.com/andrewbanchich/forty-jekyll-theme">
    <img border="0" src="/assets/img/image/image@20240601bywff11.png" alt="Forty - Jekyll Theme" />
</a><br>
<a href="https://github.com/Simpleyyt/jekyll-theme-next">
    <img border="0" src="/assets/img/image/image@20240601bywff12.png" alt="Forty - Jekyll Theme" />
</a>

Of course, there are many more high-quality templates. Please go to GitHub to search.
<br>
Once you have chosen your template, click the Fork button to fork it to your account. It is recommended to name the new repository to: 
<br>
yourname.github.io
<br>
Like this:
<br><img src="/assets/img/image/image@20240601bywff00.png" alt="Examp1e" />

### Make modifications to the repository you just created
Generally speaking, template providers will provide relevant tools and instructions. The following takes the Chirpy template as an example.

#### There are two ways to create a new repository for this theme:
Using the Chirpy Starter — Easy to upgrade, isolates irrelevant project files so you can focus on writing.
<br>
<br>
GitHub Fork— Convenient for custom development, but difficult to upgrade. Unless you are familiar with Jekyll and are determined to tweak or contribute to this project, this approach is not recommended.

##### Using the Chirpy Starter
Sign in to GitHub and browse to [Chirpy Starter](ttps://github.com/cotes2020/chirpy-starter), click the button <kbd>Use this template</kbd> > <kbd>Create a new repository</kbd>, and name the new repository `USERNAME.github.io`, where `USERNAME` represents your GitHub username.

##### GitHub Fork
Sign in to GitHub to [Fork Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy/fork), and then rename it to `USERNAME.github.io` (`USERNAME` means your username).

Next, clone the repository to your local machine, make sure it has [Node.js](https://nodejs.org/) installed, then go to the root directory of the repo and run the following command:

```console
$ bash tools/init.sh
```

> If you don't want to deploy your site on GitHub Pages, append option `--no-gh` at the end of the above command.
{: .prompt-info }

The above command will:

1. Check out the code to the [latest tag](https://github.com/cotes2020/jekyll-theme-chirpy/tags) (to ensure the stability of your site: as the code for the default branch is under development).
2. Remove non-essential sample files and take care of GitHub-related files.
3. Build CSS/JS assets files and then make them tracked by Git.
4. Automatically create a new commit to save the changes above.

#### Usage
##### Configuration
Update the variables of `_config.yml`{: .filepath} as needed. Some of them are typical options:
- `url`
- `avatar`
- `timezone`
- `lang`

##### Social Contact Options
Social contact options are displayed at the bottom of the sidebar. You can turn on/off the specified contacts in file `_data/contact.yml`{: .filepath }.

##### Customizing Stylesheet
If you need to customize the stylesheet, copy the theme's `assets/css/jekyll-theme-chirpy.scss`{: .filepath} to the same path on your Jekyll site, and then add the custom style at the end of it.

Starting with version `6.2.0`, if you want to overwrite the SASS variables defined in `_sass/addon/variables.scss`{: .filepath}, copy the main sass file `_sass/main.scss`{: .filepath} into the `_sass`{: .filepath} directory in your site's source, then create a new file `_sass/variables-hook.scss`{: .filepath} and assign new value.

##### Customing Static Assets
Static assets configuration was introduced in version `5.1.0`. The CDN of the static assets is defined by file `_data/origin/cors.yml`{: .filepath }, and you can replace some of them according to the network conditions in the region where your website is published.

Also, if you'd like to self-host the static assets, please refer to the [_chirpy-static-assets_](https://github.com/cotes2020/chirpy-static-assets#readme).

##### Running Local Server
You may want to preview the site contents before publishing, so just run it by:

```console
$ bundle exec jekyll s
```

After a few seconds, the local service will be published at _<http://127.0.0.1:4000>_.

### Deployment
Before the deployment begins, check out the file `_config.yml`{: .filepath} and make sure the `url` is configured correctly. Furthermore, if you prefer the [project site](https://help.github.com/en/github/working-with-github-pages/about-github-pages#types-of-github-pages-sites) and don't use a custom domain, or you want to visit your website with a base URL on a web server other than **GitHub Pages**, remember to change the `baseurl` to your project name that starts with a slash, e.g, `/project-name`.

Now you can choose _ONE_ of the following methods to deploy your Jekyll site.

#### Deploy by Using GitHub Actions
There are a few things to get ready for.

- If you're on the GitHub Free plan, keep your site repository public.
- If you have committed `Gemfile.lock`{: .filepath} to the repository, and your local machine is not running Linux, go to the root of your site and update the platform list of the lock-file:

  ```console
  $ bundle lock --add-platform x86_64-linux
  ```

Next, configure the _Pages_ service.

1. Browse to your repository on GitHub. Select the tab _Settings_, then click _Pages_ in the left navigation bar. Then, in the **Source** section (under _Build and deployment_), select [GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) from the dropdown menu.  
   
![Build source](/assets/img/image/image@20240601bywff13.png){: .light .border .normal w='375' h='140' }
![Build source](/assets/img/image/image@20240601bywff14.png){: .dark .normal w='375' h='140' }

1. Push any commits to GitHub to trigger the _Actions_ workflow. In the _Actions_ tab of your repository, you should see the workflow _Build and Deploy_ running. Once the build is complete and successful, the site will be deployed automatically.

At this point, you can go to the URL indicated by GitHub to access your site.

#### Manually Build and Deploy
On self-hosted servers, you cannot enjoy the convenience of **GitHub Actions**. Therefore, you should build the site on your local machine and then upload the site files to the server.

Go to the root of the source project, and build your site as follows:

```console
$ JEKYLL_ENV=production bundle exec jekyll b
```

Unless you specified the output path, the generated site files will be placed in folder `_site`{: .filepath} of the project's root directory. Now you should upload those files to the target server.

## Use custom domain name
### set you domain name
#### [Get a domain name](https://rcva.san.tc/posts/GET-A-FREE-DOMAIN-NAME),and set DNS
There are many DNS resolution service providers that provide free services, such as [DNS.HE.NET](https://ipv6.he.net/certification/register.php), [Cloudflare](https://cloudflare.com), [Domaincow.com](https://domaincow.com),etc. You can choose any one of them. The operations are similar. The following takes DNSExit as an example.

##### Enter the URL in the browser: https://dnsexit.com/index.jsp
<img src="/assets/img/image/image@20240601bywff03.png" alt="Examp1e" />
Sign up and login
<img src="/assets/img/image/image@20240601bywff04.png" alt="Examp1e" />

##### Adding your domain name and set
<img src="/assets/img/image/image@20240601bywff05.png" alt="Examp1e" />
<img src="/assets/img/image/image@20240601bywff06.png" alt="Examp1e" />
<img src="/assets/img/image/image@20240601bywff07.png" alt="Examp1e" />
<img src="/assets/img/image/image@20240601bywff08.png" alt="Examp1e" />

###### Enter the IP address of the Github server
<img src="/assets/img/image/image@20240601bywff09.png" alt="Examp1e" />

###### Click Next until the end

###### Click on the upper right corner to save DNS settings
By the way, you can add a record in the CNAME: www.example.cc = example.cc

### Set your repository
On GitHub, set up your personal web page as GitHub Pages. In your repository, go to the "Settings" page, and in the "GitHub Pages" section, select "Enforce HTTPS" and "Custom domain". Then, paste your custom domain name into the "Custom domain" field. Click the "Save" button to save your settings.Like this:
<img src="/assets/img/image/image@20240601bywff01.png" alt="Examp1e" />
<br>
Create a new file called "CHAME" in your repository and write your domain name in it, like this:
<img src="/assets/img/image/image@20240601bywff02.png" alt="Examp1e" />

## Done
Wait for the changes to be applied, then enjoy your site.
<br>
By the way, you can use https://dnschecker.org/ to check if your DNS settings are effective.