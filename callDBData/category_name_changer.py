def name_change(name):
    if name == '건설':
        return 'construction_company_list'
    elif name == '금융':
        return 'financial_company_list'
    elif name == '기계':
        return 'mechanic_company_list'
    elif name == '화학':
        return 'chemistry_company_list'
    elif name == '음식료품':
        return 'food_company_list'
    elif name == '전기/전자':
        return 'elec_company_list'
    elif name == '섬유/의복':
        return 'textile_company_list'
    elif name == '통신업':
        return 'telecom_company_list'
    elif name == '의약품':
        return 'medicine_company_list'
    elif name == '서비스업':
        return 'service_company_list'
    elif name == '철강/금속':
        return 'steel_company_data'
    else:
        return 'other_company_list'