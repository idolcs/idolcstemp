import MainWrapper from "../../Layout/MainWrapper";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "../../../css/blog.css";
import { jsx } from "react/jsx-runtime";

const Post = () => {
    const blogPostContent = `

I am a big fan of Torrents, I have been using it from a long time. But if there is something that I am not a fan of, it is the amount of time your machine has to be powered on while the files are getting downloaded via Torrent. The long wait times are usually due to lack of seeders. And sometimes there are no seeders for hours, in such cases, you and your machine both waste their time and energy waiting.

I always wondered how cool it would be if I can download the torrents on a remote machine first and then transfer it to my device in high speeds. Basically, all the waiting, searching and downloading happens on a remote machine / server and then once the files are downloaded, those are downloaded in our main machine. This saves a lot of time on your main machine and also it gives less headache.

No more keeping the computer on all night for GTA V to download. Let's look at how we will approach this.

### Setting up the VPS

I am using a VPS from Hetzner as it is the most affordable option that is available, it is easily disposable and it is transparent. The service provider is not really important, we just need a machine which will be publicly accessible and can run Ubuntu.

With our Ubuntu instance in hand, we will first make sure our dependencies and our OS is up to date.

\`\`\`bash
sudo apt update
sudo apt upgrade
\`\`\`

Once we are updated, we will install our bittorent client Deluge, we will use the web-ui variant as we are on a remote server.

\`\`\`bash
sudo apt-get install deluged deluge-web deluge-console
\`\`\`

These commands will install and run the deluge-web and our bittorent client is now accessible at \`ip:8112\`. In my case it is http://135.181.200.11:8112

![Picture](https://cdn.hashnode.com/res/hashnode/image/upload/v1718854663754/f370a02b-d647-402c-9cb7-e42d7bbf5d85.png)

The default password is 'deluge'.

We will be prompted with a screen which will ask us to select a daemon to connect with, we shall select the one that we see on the screen.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718854766718/704b39eb-1c19-4917-a30c-5b7d9224e475.png)

Once done, we are now ready to download our favourite torrents on the server. Fore this tutorial we will be downloading Ubuntu from the official ubuntu website. I copied the .torrent file link from the Ubuntu website.

Now we shall click on the Add button to start a new download

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718855028221/55fc8bad-d289-41b6-9b7b-4119e22787f2.png)

From the prompt that is opened, we will select URL as we did not download the .torrent file or else we can select the File option.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718855072781/11400c49-7fc2-4e2e-9fa5-5fa87f407c32.png)

Once the URL is submitted, our download will start. Not only it is hassle free but the download speeds are also insane on the server.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718855179051/ee9d4c91-6284-4ede-9c8f-ff95f5a679df.png)

But we are not aiming for download speeds, as we will be bottlenecked to the maximum download speed that our VPS provides to us, we are focused on remote downloading which does not require our computer to be active for days and hours.

Once our download is finished, we can pause it, so it does not keep seeding. And then the second part our task arrives.

### Downloading the files on the computer

If we click on preferences, we can see that our files are saved in \`/var/lib/deluged/Downloads\`

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718855428630/671e8f1d-2f33-405b-890d-822f520a847c.png)

If we \`ls\` into that directory we can see our downloaded file

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718855540811/f6ee55a8-b1ab-433c-9640-c45e2ab175c0.png)

Now, we just have to download this file on our local computer. There are several methods to achieve this. We will make a http server and download our file from the browser. To do it we have to install apache

\`\`\`bash
sudo apt install apache2
\`\`\`

Once apache is installed, if we visit our IP address, we shall see the default apache page

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718855697405/d08f357d-ace8-4c7b-9e47-43e9089a80e5.png)

The files for apache server are stored under \`/var/www/html/\`. We will have to move our file there, to do it we will do

\`\`\`bash
mv /var/lib/deluged/Downloads/<filename> /var/www/html/<filename>
\`\`\`

In my case, it is \`mv /var/lib/deluged/Downloads/ubuntu-24.04-desktop-amd64.iso /var/www/html/ubuntu-24.04-desktop-amd64.iso\`. Now our file is also moved we now can download our file from. \`ip/filename\`, in my case it is [\`http://135.181.200.11/ubuntu-24.04-desktop-amd64.iso\`](http://135.181.200.11/ubuntu-24.04-desktop-amd64.iso)

We will be greeted with a '403 Forbidden' error as soon as we open this page

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718856771078/76b5ccd8-ff00-4ce2-ba78-1d75ec65e2f6.png)

This is because the Apache does not have enough permissions of this file, we can solve this with one simple command

\`\`\`bash
chmod -R 777 /var/www/html
\`\`\`

Once again hit the URL and our download shall start instantly!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1718856909912/312ac09f-f8f1-4014-afa3-f2f3d5ac21f7.png)

That's how you torrent a file using VPS!




`;

    return (
        <>
            <p className="text-[1.5em] font-bold">
                New Course on Blockchain technology announced for Semester 5
                Elective
            </p>
            <p className="text-[0.8em] mt-2">
                12 February 2024, Yash Kolambekar
            </p>
            <div className="mt-8 blogpostarea">
                <ReactMarkdown remarkPlugins={[[remarkGfm, {singleTilde: false}]]}>
                    {blogPostContent}
                </ReactMarkdown>
            </div>
        </>
    );
};

Post.layout = (page) => <MainWrapper children={page} />;
export default Post;
