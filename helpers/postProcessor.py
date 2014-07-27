inputText = "Item Number 1 , message_part_1: Dear Mum,~|thank you so much for your help and support with Anthea and my wedding. It wouldn't have been possible without you.~|~|Thanks for all the help and support you've given me over the years, a , message_part_2: nd for being the best mum in the world.~|~|Love you lots~|Pat-xox- , message_part_3: , message_part_4: , address_part_1: Kate Acheampong~|3 Agate Close~|London ~|E16 3TU~|UK~|PNPATP1AU48f7C1 , address_part_2: agreed:true"

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