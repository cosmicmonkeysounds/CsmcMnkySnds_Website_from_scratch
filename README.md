# CsmcMnkySnds_Website_from_scratch

-------------------------------------------------------------
----------------PYTHON INVENTORY USING PANDAS----------------
-------------------------------------------------------------

1. Prompt user for the filename of the spreadsheet containing the bill of materials (use test_parts_list   to start),
    store it as local variable PARTS_LIST, import INVENTORY_LIST, create a spreadsheet PARTS_COMPARE
2. Read (nth) row of PARTS_LIST
3. Determine what type of part 
        (resistor = 'R', capacitor = "C", diode = "D", IC = "IC", 
         transistor = "Q", transformer = "TR", or inductor = "L")
4. Read the value of part and quantity needed
5. Search INVENTORY_LIST
    If the correct value and quanity is found, return "Yes Daddy"
    If the correct value is found, but not enough, return "Need (n) more (component-value) Mami"
    else return "Get your shit together, Mami!"
6. Write returned string to (nth) row of PARTS_COMPARE
7. If EOF, write EOF and end, else GO TO 2
