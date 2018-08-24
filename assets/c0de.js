

var decodeLUT = [
	['.', 'ё', 'л', 'с', 'ч', 'э', '«'],
    ['а', ',', 'м', 'т', 'ш', 'ю', '»'],
    ['б', 'ж', '!', 'у', 'щ', 'я', '*'],
    ['в', 'з', 'н', '?', 'ъ', '(', '+'],
    ['г', 'и', 'о', 'ф', ':', ')', '='],
    ['д', 'й', 'п', 'х', 'ы', '-', '~'],
    ['е', 'к', 'р', 'ц', 'ь', '/', ';']
];


var symbols = ['.', 'ё', 'л', 'с', 'ч', 'э', '«', 'а', ',', 'м', 'т', 'ш', 'ю', '»', 'б', 'ж', '!', 'у', 'щ', 'я', '*', 'в', 'з', 'н', '?', 'ъ', '(', '+', 'г', 'и', 'о', 'ф', ':', ')', '=', 'д', 'й', 'п', 'х', 'ы', '-', '~', 'е', 'к', 'р', 'ц', 'ь', '/', ';'],

	indexes = ['22', '23', '24', '25', '26', '27', '28', '32', '33', '34', '35', '36', '37', '38', '42', '43', '44', '45', '46', '47', '48', '52', '53', '54', '55', '56', '57', '58', '62', '63', '64', '65', '66', '67', '68', '72', '73', '74', '75', '76', '77', '78', '82', '83', '84', '85', '86', '87', '88' ];


function decode(tx)
{
	var result = '', tempch = '';

	var nextIsUpper = false;

	for (i = 0; i < tx.length; i++)
    {
    	if (isNaN(tx[i]))
           	continue;

    	switch (tx[i])
        {
        	case '0' : 
            	result += ' ';
                break;
                
            case '1' :
            	nextIsUpper = true;
                break;
                
            case '9' :
            	result += "\n";
                break;
                
           	default :

           		if (typeof decodeLUT[parseInt(tx[i])-2][parseInt(tx[i+1])-2] == 'undefined')
           			continue;

            	tempch = decodeLUT[parseInt(tx[i])-2][parseInt(tx[i+1])-2];
                i++;

                if (nextIsUpper)
                {
                	tempch = tempch.toUpperCase();
                	nextIsUpper = false;
                }

                result += tempch;
            	break;
        }
    }
    
    return result;
}

function isUpper(ch)
{
	return (ch.match (/^[^\u0000-\u007F]$/) && ch === ch.toUpperCase()) ? true : false;
}

function encode(tx)
{
	var result = '';

	for (i = 0; i < tx.length; i++)
	{
		switch(tx[i])
		{
			case "\n" :
				result += '9';
				break;

			case ' ' :
				result += '0';
				break;

			default :
				if (isUpper(tx[i]))
					result += '1';

				var idx = symbols.indexOf(tx[i].toLowerCase());

				if (idx > -1)
					result += indexes[idx];
				break;
		}
	}

	return result;
}

function go (mode)
{
	document.getElementById('output').value =
				(mode == 'encode')
						? encode(document.getElementById('input').value)
						: decode(document.getElementById('input').value);
}