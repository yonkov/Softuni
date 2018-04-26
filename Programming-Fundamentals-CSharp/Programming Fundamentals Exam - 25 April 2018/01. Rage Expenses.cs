using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task_1RageExpenses
{
    class Program
    {
        static void Main(string[] args)
        {
            int lostGames = int.Parse(Console.ReadLine());
            double headsetPrice = double.Parse(Console.ReadLine());
            double mousePrice = double.Parse(Console.ReadLine());
            double keyboardPrice = double.Parse(Console.ReadLine());
            double displayPrice = double.Parse(Console.ReadLine());

            int trashedHeadsets = 0;
            int trashedmouses = 0;
            int trashedkeyboards = 0;
            int trasheddisplays = 0;

            trashedHeadsets = lostGames / 2;
            trashedmouses = lostGames / 3;           
            trashedkeyboards = lostGames / 6;
            trasheddisplays = lostGames/12;

            double rageExpenses = trashedHeadsets * headsetPrice + trashedmouses * mousePrice + trashedkeyboards * keyboardPrice +trasheddisplays*displayPrice;

            Console.WriteLine("Rage expenses: {0:f2} lv.", rageExpenses);
        }
    }
}
