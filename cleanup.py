import re

def clean_ips():
    try:
        with open('raw.txt', 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        pure_ips = set()
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # 1. 截取 # 之前的地址内容
            addr = line.split('#')[0].strip()
            
            # 2. 移除端口号：匹配最后一个冒号及其后的数字
            addr = re.sub(r':[0-9]+$', '', addr)
            
            # 3. 关键修复：移除 IPv6 的中括号 [] 
            # CloudflareST 工具不需要中括号也能识别 IPv6
            addr = addr.replace('[', '').replace(']', '')
            
            if addr:
                pure_ips.add(addr)
        
        with open('test_ip.txt', 'w', encoding='utf-8') as f:
            for ip in sorted(list(pure_ips)):
                f.write(ip + '\n')
                
        print(f"清洗完成，共提取 {len(pure_ips)} 个地址")
    except Exception as e:
        print(f"清理脚本运行出错: {e}")

if __name__ == "__main__":
    clean_ips()
