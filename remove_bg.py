import os
from PIL import Image

def remove_white_bg(img_path, out_path):
    print(f'Processing {img_path}...')
    img = Image.open(img_path).convert('RGBA')
    datas = img.getdata()
    newData = []
    
    for item in datas:
        # If the pixel is white or very close to white (e.g. >235 on R, G, B)
        # make it transparent
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            # Change to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(out_path, 'PNG')
    print('Done.')

folder = r'c:\Users\kingm\OneDrive\Desktop\Aleidlaw_web\assets\images\partners'
files = list(os.listdir(folder))
for f in files:
    if f.endswith(('.jpg', '.png', '.jpeg')):
        full_path = os.path.join(folder, f)
        base_name = f.rsplit('.', 1)[0]
        out_name = base_name + '_trans.png'
        out_path = os.path.join(folder, out_name)
        try:
            remove_white_bg(full_path, out_path)
            # Remove original and replace with transparent
            os.remove(full_path)
            os.rename(out_path, os.path.join(folder, base_name + '.png'))
        except Exception as e:
            print(f'Failed on {f}: {e}')
