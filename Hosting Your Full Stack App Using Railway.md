# Hosting Your Full Stack App Using Railway

## Table of Contents

- [Creating an Account](#creating-an-account)
- [Back End](#back-end)
- [Front End](#front-end)

Now that you have finished the final project in this Techdegree, you'll want to showcase your work to the rest of the world. In this instruction step, we'll walk you through how to easily get both the front end and the back end hosted on Railway.

---

## Creating an Account

To get started, you'll want to create an account on [Railway](https://railway.app/). Simply click the `Login` button in the top right of their webpage and set up an account either by using your email or your GitHub credentials.

Next up, you'll want to create a new App by clicking the [New Project](https://railway.app/new) button in the top right. The most convenient way to host your project would be to use the "Deploy from GitHub Repo" option. This allows you to simply select your repository; it will take all your code and deploy it for you. If you're doing this for the first time, you may have to authorize Railway to get access to your repositories on GitHub. You can do so by clicking "Configure GitHub App" and following the instructions. After that, you'll want to choose the "Deploy from GitHub Repo" option, followed by selecting the repository you wish to host.

## Back End

Once you've selected a repository, Railway will right away start building and deploying your project. By default, it tries to run your project in the root of your repository, but since we set up the final project in two different folders that both need to run (`/api` and `/client`) you'll want to tell it where to find your back end.

To change that default, you can click on the created project in the middle of the screen to open the Settings for the deployment. In Settings, look for the General section that can be found under Settings -> Service, then change the **Root Directory** to `/api` followed by clicking the checkmark icon behind the input field. A couple of seconds after doing so, Railway will trigger a redeploy.

![Railway Settings](https://image-proxy-cdn.teamtreehouse.com/3e264a0548ea061b72d65dda03ef1e245652ae30/68747470733a2f2f74726565686f7573652d7465616368696e672e73332e616d617a6f6e6177732e636f6d2f686f7374696e672d66696e616c2d70726f6a6563742f73657474696e67732e706e67)

Once that has finished, you can set up a domain for your API by clicking the **Generate Domain** button in Settings, this will give you a URL that you will be able to make your requests to. By default, the URL will look something like this:

```
https://<REPO_NAME>.up.railway.app
```

![Generate Domain](https://image-proxy-cdn.teamtreehouse.com/428cb61399e4ca93b8960b9fd1f46158b47e0367/68747470733a2f2f74726565686f7573652d7465616368696e672e73332e616d617a6f6e6177732e636f6d2f686f7374696e672d66696e616c2d70726f6a6563742f67656e65726174652d646f6d61696e2e706e67)

To make sure everything is working correctly you can open up that URL in your browser and go to the `/api/courses` endpoint. This should return you the array of courses that are present in your database.

If you're not seeing any courses here make sure that your database is present in your GitHub repository, if it isn't make sure to create a `.db` file by running `npm run seed` and pushing that file up to GitHub.

## Front End

Now for the front end, we'll have to change a tiny bit of the code, since most likely you currently have things set up to connect with the API over `http://localhost:5000` while the API is no longer running on your localhost. You'll want to change the URLs that point to localhost in your front end to the URL that was created in the previous step. Depending on how you've set up your front end, you may have to change this in multiple places to get all the requests working correctly. Once you got all those instances replaced with the live URL, you can stage, commit, and push those changes to your GitHub repository.

Once that is done, you're ready to get your front end hosted with the same steps. While still in the same project on the Railway page, click the **+ New** button in the top right and then click **GitHub Repo** and choose the same repository again. This time in Settings, change the **Root Directory** to `/client`. Once your project is built and deployed, click the **Generate Domain** again and you'll get another URL for your front end project. When navigating to this URL, you'll be presented with your full stack application, ready to be shared with the rest of the world! 😄 