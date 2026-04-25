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
            
            # 2. 正则匹配：去除行尾的端口号
            # 兼容 IPv4 (1.1.1.1:443 -> 1.1.1.1)
            # 兼容 IPv6 ([2001:db8::1]:443 -> [2001:db8::1])
            # 兼容 域名 (zeas.top:443 -> zeas.top)
            addr = re.sub(r':[0-9]+$', '', addr)
            
            if addr:
                pure_ips.add(addr)
        
        # 将清洗后的纯净地址写入 test_ip.txt 供工具使用
        with open('test_ip.txt', 'w', encoding='utf-8') as f:
            for ip in sorted(list(pure_ips)):
                f.write(ip + '\n')
                
        print(f"清洗完成，共提取 {len(pure_ips)} 个地址")
    except Exception as e:
        print(f"清理脚本运行出错: {e}")

if __name__ == "__main__":
    clean_ips()
