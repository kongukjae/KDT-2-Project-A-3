def show_file(filename):
    f = open(filename,'r',encoding='cp949')

    lines = f.readlines()

    for line in lines:
        print(line,end='')
    
    f.close()

show_file('kosdaq_code.mst')