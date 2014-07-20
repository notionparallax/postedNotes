inputText = "Item Number 1 , message_part_1: Dearest Bede:~|~|Sometimes the world looks perfect, ~|Nothing to rearrange. ~|Sometimes you just, get a feeling~|Like you need some kind of change. ~|~|No matter what the odds are this time, ~|Nothing , message_part_2: 's going to stand in my way. ~|This flame in my heart, ~|And a long lost friend ~|Gives every dark street a light at the end. ~|~|Standing tall, on the wings of my dream. ~|Rise and fall, on the wings , message_part_3: of my dream. ~|~|The rain and thunder ~|The wind and haze ~|I'm bound for better days.~|It's my life and my dream, ~|Nothing's going to stop me now.~|~|Love,~|Emma xxoo , message_part_4: , address_part_1: Bede Timms~|10 / 23 Irwell St~|St Kilda~|VIC 3182~|PNEMMP1AU7eD6E1 , address_part_2: agreed:true"

import re

message,address = inputText.split(", address_part_1: ")
# print "split",message,address

print "Message:\n"
message = re.sub("Item Number 1 ","", message)
messageLines = re.sub(", message_part_\d: ","",message).split("~|")
for s in messageLines:
	print s.strip()
print

print "Address:\n"
address = re.sub(", address_part_2: ","", address)
address = re.sub("agreed:true","", address)
addressLines = re.sub(", message_part_\d:","",address).split("~|")
for s in addressLines:
	print s.strip()