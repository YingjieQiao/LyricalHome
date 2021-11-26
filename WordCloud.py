import time
from wordcloud import WordCloud
import cv2
import jieba
import matplotlib.pyplot as plt


with open('libai.txt', 'r',encoding="utf-8") as f:
    text = f.read()

cut_text = " ".join(jieba.cut(text))

color_mask = cv2.imread('libai.jpg')

cloud = WordCloud(
    # 设置字体，不指定就会出现乱码
    font_path="./assets/computer-modern/cmunbi.ttf",
    # font_path=path.join(d,'simsun.ttc'),
    background_color='white',
    mask=color_mask,
    max_words=500,
    max_font_size=40
)

wCloud = cloud.generate(cut_text)

now = int(time.time())
timeStruct = time.localtime(now)
strTime = time.strftime("%Y%m%d%H%M%S", timeStruct)

wCloud.to_file(strTime+".jpg")


plt.imshow(wCloud, interpolation='bilinear')
plt.axis('off')
plt.show()