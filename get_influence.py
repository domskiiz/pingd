from selenium import webdriver
import imageio
import time

# TODO:
# Collect "instagram worthy" photos from instagram influencers
# Collect non-instagram worthy photos from internet-- resize to insta-photos
# Binary label for instaworthiness
# Feed in GAN
# Make account and become famous

# Requirements:
# 60,000 photos would be amazing. Potentially 50/50 split of insta/non
# I'll need to save this stuff in the cloud probably
# Use VisualQA (VQA) photo dataset for non-insta photos

# Interesting ideas:
# Make the Discriminator a CNN so it can pick up faces/objects.
# There is potential for the generator to learn influencer faces pass Discriminator-- I'm ok with that
# I need to have a wide range of influencers in addition to # of photos
# I can output the disciminator's belief that a post will be successful

# TODO:
# Get 500 influencer, 500 random photos


def become_insta_famous(influencer):
    browser.get('https://www.instagram.com/'+influencer)
    post_num_str = browser.find_elements_by_css_selector("span.g47SY")[0].text
    post_num_str = post_num_str.replace(',', '')
    post_num = int(post_num_str)

    row_num = round(post_num/3)
    status_updates = [(post_num/4)*i for i in range(1, 5)]
    status = 25

    print("Scrolling through {0}'s feed (~{1} minutes)...".format(influencer, round(row_num/2/60)))
    for i in range(row_num):
        depth = 1080*i + 450  # For the header
        browser.execute_script("window.scrollTo(0, {})".format(str(depth)))
        time.sleep(0.5)
        # Currently it stops at 3 scrolls, but we can actually go all the way down to pull
        # As many photos as can
        if i == 3:
            break
        if i in status_updates:
            print(status, '%')
            status = status + 25
    elems = browser.find_elements_by_css_selector("div.Nnq7C.weEfm")

    elems = browser.find_elements_by_class_name('FFVAD')
    num_photots = len(elems)
    print("Saving {0}'s photos (can process {1} photos in ~ {2} minutes)...".format(influencer, num_photots, round(num_photots*0.66/60)))
    status_updates = [round(num_photots/4)*i for i in range(1, 5)]
    status = 25
    for i in range(len(elems)):
        if i in status_updates:
            print(status, '%')
            status = status + 25
        elem = elems[i]
        img_url = elem.get_property('src')
        m = imageio.imread(img_url)
        imageio.imwrite('influencers/{0}_{1}.png'.format(influencer, i), m)


# RUN CODE ##
browser = webdriver.Chrome()
insta_influencers = ['kendalljenner', 'hudabeauty']
for user_name in insta_influencers:
    become_insta_famous(user_name)
browser.quit()
