using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task_1
{
    class Program
    {
        static void Main(string[] args)
        {
            double money = double.Parse(Console.ReadLine());
            int students = int.Parse(Console.ReadLine());
            double lightsabersPrice = double.Parse(Console.ReadLine());
            double robesPrice = double.Parse(Console.ReadLine());
            double beltsPrice = double.Parse(Console.ReadLine());
            
            double neededEquipmentPrice = Math.Ceiling(students+0.1*students)*lightsabersPrice + robesPrice * students + beltsPrice* (students - students / 6);

            if (money>=neededEquipmentPrice)
            {
                Console.WriteLine("The money is enough - it would cost {0:f2}lv.", neededEquipmentPrice);
            }
            else
            {
                Console.WriteLine("Ivan Cho will need {0:f2}lv more.", neededEquipmentPrice-money);
            }
        }
    }
}
